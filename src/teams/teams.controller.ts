import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamDto } from './dto/get-team.dto';

import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post('/create')
  create(@Body() createDto: CreateTeamDto) {
    return this.teamsService.createTeam(createDto);
  }

  @Post('/get')
  get(@Body() getDto: GetTeamDto) {
    return this.teamsService.getTeam(getDto);
  }
    @Get('/getAll')
  getAll() {
    return this.teamsService.getAllTeams();
  }
}
