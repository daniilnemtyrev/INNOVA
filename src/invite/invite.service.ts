import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { CancelInviteDto } from './dto/cancel-invite.dto';
import { CreateInviteDto } from './dto/create-invite';
import { GetInvitesDto } from './dto/get-invites.dto';
import { Invite } from './invite.model';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite) private inviteRepository: typeof Invite,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async sendInvite(dto: CreateInviteDto) {
    const invite = await this.inviteRepository.create(dto);
  }

  async acceptInvite(dto: AcceptInviteDto) {
    await this.usersService.setTeam(dto);

    await this.inviteRepository.destroy({ where: { id: dto.id } });
  }

  async cancelInvite(dto: CancelInviteDto) {
    await this.inviteRepository.destroy({ where: { id: dto.id } });
  }

  async getInvites(dto: GetInvitesDto) {
    const invites = await this.inviteRepository.findAll({
      where: { invitedUserId: dto.invitedUserId },
    });

    return invites;
  }
}
