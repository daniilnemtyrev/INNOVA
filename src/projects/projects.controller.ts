import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetProjectDto } from './dto/get-project';
import { ProjectDto } from './dto/project.dto';
import { SetProjectDto } from './dto/set-project-dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Post('/create')
  create(@Body() projectDto: ProjectDto) {
    return this.projectService.createProject(projectDto);
  }
    @Post('/update')
  update(@Body() projectDto:SetProjectDto) {
    return this.projectService.setProject(projectDto);
  }

  @Post('/myProject')
  getProjectsByTeamId(@Body() dto: GetProjectDto) {
    return this.projectService.getProjectsByTeamId(dto);
  }
}
