import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/tokens/tokens.service';
import { User } from 'src/users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUser } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async login(userDto: LoginUser) {
    const user = await this.validateUser(userDto);

    const tokens = this.tokenService.generateToken(user);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    const data = { ...tokens, user };
    return data;
  }

  private async validateUser(userDto: LoginUser) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Email не найден',
      });
    }
    if (user != null) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (!passwordEquals) {
        throw new UnauthorizedException({
          message: 'Неверный пароль',
        });
      }
    }
    return user;
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = this.tokenService.generateToken(user);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    const data = { ...tokens, user };
    return data;
  }

  async logout(refreshToken) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'Ошибка авторизации',
      });
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException({
        message: 'Ошибка авторизации',
      });
    }
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    const tokens = this.tokenService.generateToken(user);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    const data = { ...tokens, user };
    return data;
  }
}
