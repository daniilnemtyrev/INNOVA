import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from 'src/projects/project.model';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { TeamsController } from './teams.controller';
import { Team } from './teams.model';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [
    SequelizeModule.forFeature([User, Team, Project]),
    forwardRef(() => UsersModule),
  ],
})
export class TeamsModule {}
