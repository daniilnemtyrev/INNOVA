import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { Team } from 'src/teams/teams.model';
import { User } from 'src/users/users.model';

interface InviteCreationOptions {
  invitedUserId: number;
  teamId: number;
  senderName: string;
}

@Table({ tableName: 'invites', createdAt: false, updatedAt: false })
export class Invite extends Model<Invite, InviteCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  invitedUserId: number;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teamId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  senderName: string;
}
