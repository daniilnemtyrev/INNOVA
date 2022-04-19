import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { UpdReqStatusDto } from './dto/upd-req-status.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    await user.update({
      request_status: 'Не подтвержден',
    });
    const role = await this.roleService.getRoleByValue('user');
    await user.$set('roles', [role.id]);
    return user;
  }

  async editUser(dto: CreateUserDto) {
    const user = await this.userRepository.findByPk(dto.id);
    await user.update({
      surname: dto.surname,
      name: dto.name,
      patronymic: dto.patronymic,
      phone: dto.phone,
      birthdate: dto.birthdate,
      move_to: dto.move_to,
      move_from: dto.move_from,
      post_status: dto.post_status,
      place_of_work_stud: dto.place_of_work_stud,
    });
    return user;
  }

  async updateRequestStatus(dto: UpdReqStatusDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    await user.update({
      request_status: dto.reqStatus,
    });
    return user.request_status;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async giveRole(dto: GiveRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('roles', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDto) {}
}
