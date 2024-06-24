import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTokens } from './dto/create-tokens';
import { Token, TokenCreationOptions } from './tokens.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {}

  generateToken(user) {
    const payload = {
      email: user.email,
      userId: user.id,
      roles: user.roles,
    };
    return {
      acessToken: this.jwtService.sign(payload, {
        expiresIn: '30m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '30d',
      }),
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId: userId },
      include: { all: true },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return tokenData;
    }
    const token = await this.tokenRepository.create({
      userId: userId,
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenRepository.destroy({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }

  validateAccesToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await this.tokenRepository.findOne({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }
}
