import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';

import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getDefaultUsers() {
    const defaultUsers = await this.userRolesRepository.findAll({
      where: { roleId: 1 },
    });
    return defaultUsers;
  }
}
