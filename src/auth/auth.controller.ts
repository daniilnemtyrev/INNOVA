import {
  Body,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { MessageDto } from 'src/chat/dto/messages.dto';
import { ChatService } from 'src/chat/chat.service';
import { LoginUser } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private chatService: ChatService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Body() userDto: LoginUser, @Res() res: Response) {
    const userData = await this.authService.login(userDto);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const userData = await this.authService.registration(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('/logout')
  async logout(
    @Body() messageDto: MessageDto[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    //console.log(messageDto);
    // await this.chatService.saveMessages(messageDto);
    const { refreshToken } = req.cookies;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  }

  @Get('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(token);
  }
}
