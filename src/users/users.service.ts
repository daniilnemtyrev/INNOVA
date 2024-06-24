import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { of } from 'rxjs';
import { Invite } from 'src/invite/invite.model';
import { Project } from 'src/projects/project.model';

import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { Team } from 'src/teams/teams.model';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GiveRoleDto } from './dto/give-role.dto';
import { RemoveUserTeamDto } from './dto/remove-user-team.dto';
import { SetImageDto } from './dto/set-image.dto';
import { SetProjectDto } from './dto/set-project.dto';
import { SetTeamDto } from './dto/set-team.dto';
import { UpdReqStatusDto } from './dto/upd-req-status.dto';
import { User } from './users.model';
import {ChangePointsDto} from './dto/change-points-dto'
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

  async setImage(file: Express.Multer.File, id: number) {
    const user = await this.userRepository.findByPk(id);
    await user.update({
      imagePath: file.path,
    });
    return user.imagePath;
  }

  async findImage(id: number, res) {
    const user = await this.userRepository.findByPk(id);
    return of(res.sendFile(join(process.cwd(), user.imagePath)));
  }

  async editUser(dto: CreateUserDto, id) {
    const user = await this.userRepository.findByPk(id);
    console.log(user);

    await user.update({
      surname: dto.surname,
      name: dto.name,
      patronymic: dto.patronymic,
      phone: dto.phone,
      birthdate: dto.birthdate,
      move_to: dto.move_to,
      move_from: dto.move_from,
      post_status: dto.post_status,
      request_status: dto.request_status,
      place_of_work_stud: dto.place_of_work_stud,
      status: dto.status
    });
    return user;
  }

  async updateRequestStatus(dto: UpdReqStatusDto) {
    const user = await this.userRepository.findByPk(dto.id);
    await user.update({
      request_status: dto.reqStatus,
    });
    return user.request_status;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return { data: [...users], total: users.length };
  }

  async getConfirmedUsers() {
    const users = await this.userRepository.findAll({
      where: { request_status: 'Подтвержден', teamId: null },
    });

    const defaultUsers = await this.roleService.getDefaultUsers();

    const confirmedUsers = defaultUsers.map((defaultUser) =>
      users.find((user) => defaultUser.userId === user.id),
    );

    return confirmedUsers;
  }

  async deleteUserById(id: number) {
    await this.userRepository.destroy({
      where: { id },
    });
  }

  async getFiltredUsers() {
    const users = await this.userRepository.findAll({
      where: { request_status: 'Ожидается подтверждение' },
    });
    return { data: [...users], total: users.length };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: [
        { model: Project, attributes: ['id', 'name'] },
        { model: Team, attributes: ['id', 'name'] },
        { model: Role, attributes: ['value'] },
        { model: Invite },
      ],
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

  async setTeam(dto: SetTeamDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    await user.update({
      teamId: dto.teamId,
    });
  }

  async setProject(dto: SetProjectDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    await user.update({
      projectId: dto.projectId,
    });
  }

  async removeUserTeam(dto: RemoveUserTeamDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    await user.update({
      projectId:null,
      teamId: null,
    });
  }


    async changePoints(dto: ChangePointsDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    await user.update({
      points: dto.points,
    });
  }

  async banUser(dto: BanUserDto) {}
}
