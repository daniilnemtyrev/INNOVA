import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { GetProjectDto } from './dto/get-project';
import { ProjectDto } from './dto/project.dto';
import { SetProjectDto } from './dto/set-project-dto';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async createProject(dto: ProjectDto) {
    const project = await this.projectRepository.create(dto);
    await this.usersService.setProject({
      projectId: project.id,
      userId: dto.userId,
    });
    return project;
  }

    async setProject(dto: SetProjectDto) {
    await this.usersService.setProject({
      projectId: dto.projectId,
      userId: dto.userId,
    });
  }

  async getProjectsByTeamId(dto: GetProjectDto) {
    try{
        const projects = await this.projectRepository.findOne({
      where: { teamId: dto.id },
    });
    return projects;
    }
    catch (err){
    }
  }
}
