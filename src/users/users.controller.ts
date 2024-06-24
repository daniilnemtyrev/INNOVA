import {
  Delete,
  Get,
  Param,
  Patch,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NewsDto } from 'src/news/dto/news.dto';
import { News } from 'src/news/news.model';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { BanUserDto } from './dto/ban-user.dto';
import { ChangePointsDto } from './dto/change-points-dto';

import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { RemoveUserTeamDto } from './dto/remove-user-team.dto';
import { SetImageDto } from './dto/set-image.dto';
import { UpdReqStatusDto } from './dto/upd-req-status.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post(':id/setImage')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets/profile',
        filename: (req, file, cb) => {
          const fileName: string = parse(file.originalname).name.replace(
            /\s/g,
            '',
          );
          const extension: string = parse(file.originalname).ext;

          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  setImage(
    @UploadedFile() file: Express.Multer.File,

    @Param('id') id: string,
  ) {
    console.log(file);

    return this.userService.setImage(file, +id);
  }

  @Get(':id/image')
  getImage(@Param('id') id: string, @Res() res) {
    return this.userService.findImage(+id, res);
  }

  @Get('/getConfirmedUsers')
  getConfirmedUsers() {
    return this.userService.getConfirmedUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/editUser')
  editUserProfile(@Body() userDto: CreateUserDto) {
    return this.userService.editUser(userDto, userDto.id);
  }

  @Post('')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Post('/removeUserTeam')
  removeUserTeam(@Body() removeUserTeamDto: RemoveUserTeamDto) {
    return this.userService.removeUserTeam(removeUserTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editUser(@Param('id') id: number, @Body() userDto: CreateUserDto) {
    return this.userService.editUser(userDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/updReqStatus')
  updateRequestStatus(@Body() dto: UpdReqStatusDto) {
    return this.userService.updateRequestStatus(dto);
  }

  // @Roles('admin')
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)

  @Get('/requests')
  getUsersByRequest() {
    return this.userService.getFiltredUsers();
  }
    @Post('/changePoints')
  changePoints(@Body() changePointsDto: ChangePointsDto) {
    return this.userService.changePoints(changePointsDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    this.userService.deleteUserById(id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/giveRole')
  giveRole(@Body() dto: GiveRoleDto) {
    return this.userService.giveRole(dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/banUser')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }
}
