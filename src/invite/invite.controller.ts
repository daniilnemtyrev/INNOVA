import { Body, Controller, Post } from '@nestjs/common';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { CancelInviteDto } from './dto/cancel-invite.dto';
import { CreateInviteDto } from './dto/create-invite';
import { GetInvitesDto } from './dto/get-invites.dto';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Post('/sendInviteToTeam')
  sendInviteToTeam(@Body() inviteDto: CreateInviteDto) {
    return this.inviteService.sendInvite(inviteDto);
  }

  @Post('/acceptInvite')
  acceptInvite(@Body() acceptDto: AcceptInviteDto) {
    
    this.inviteService.acceptInvite(acceptDto);
  }

  @Post('/cancelInvite')
  cancelInvite(@Body() cancelDto: CancelInviteDto) {
    return this.inviteService.cancelInvite(cancelDto);
  }

  @Post('/getInvites')
  getInvites(@Body() getInvitesDto: GetInvitesDto) {
    return this.inviteService.getInvites(getInvitesDto);
  }
}
