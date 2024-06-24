import { User } from './../users/users.model';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { Team } from './teams.model';
import { Project } from 'src/projects/project.model';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team) private teamRepository: typeof Team,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async createTeam(dto: CreateTeamDto) {
    const team = await this.teamRepository.create({
      name: dto.name,
      creatorId: dto.userId,
    });
    await this.usersService.setTeam({ teamId: team.id, userId: dto.userId });
    return team;
  }

  async getTeam(dto: GetTeamDto) {
    const team = await this.teamRepository.findByPk(dto.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'surname','points'] },
        { model: Project, attributes: ['id', 'name'] },
      ],
    });
        return team;
  }
      async getAllTeams(){
      const teams = await this.teamRepository.findAll();
      return teams;
}
}
