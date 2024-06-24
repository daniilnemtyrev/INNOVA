import { AuthModule } from './../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { Project } from 'src/projects/project.model';
import { Messages } from 'src/chat/chat-messages.model';
import { Team } from 'src/teams/teams.model';
import { Track } from 'src/tracks/tracks.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Project,
      Messages,
      Track,
      Team,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => RolesModule),
    forwardRef(() => TokensModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
