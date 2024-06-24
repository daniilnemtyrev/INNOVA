import { Sponsors } from './sponsors/sponsors.model';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { Token } from './tokens/tokens.model';
import { AppGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { ProjectsModule } from './projects/projects.module';
import { CasesModule } from './cases/cases.module';
import { TracksModule } from './tracks/tracks.module';
import { Case } from './cases/cases.model';
import { Track } from './tracks/tracks.model';
import { Project } from './projects/project.model';
import { Messages } from './chat/chat-messages.model';
import { TeamsModule } from './teams/teams.module';
import { Team } from './teams/teams.model';
import { TimetableModule } from './timetable/timetable.module';
import { Timetable } from './timetable/timetable.model';
import { NewsModule } from './news/news.module';
import { News } from './news/news.model';
import { SponsorsModule } from './sponsors/sponsors.module';
import { InvitesModule } from './invite/invite.module';
import { Invite } from './invite/invite.model';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/tasks.model';

@Module({
  controllers: [],
  providers: [AppGateway],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'a45359_innova3',
      password: 'q1w2e3r4t5',
      database: 'a45359_innova3',
      models: [
        Tasks,
        News,
        User,
        Token,
        Role,
        UserRoles,
        Case,
        Track,
        Project,
        Messages,
        Team,
        Timetable,
        Sponsors,
        Invite,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ChatModule,
    RolesModule,
    ProjectsModule,
    CasesModule,
    TracksModule,
    TeamsModule,
    TimetableModule,
    NewsModule,
    SponsorsModule,
    InvitesModule,
    TasksModule,
  ],
})
export class AppModule {}
