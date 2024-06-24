export class CreateInviteDto {
  readonly id: number;
  readonly teamId: number;
  readonly invitedUserId: number;
  readonly senderName: string;
}
