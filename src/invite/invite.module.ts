import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { InviteController } from './invite.controller';
import { Invite } from './invite.model';
import { InviteService } from './invite.service';

@Module({
  controllers: [InviteController],
  providers: [InviteService],
  imports: [
    SequelizeModule.forFeature([Invite]),
    forwardRef(() => UsersModule),
  ],
})
export class InvitesModule {}
