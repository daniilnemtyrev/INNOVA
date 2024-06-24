import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Invite } from 'src/invite/invite.model';
import { Project } from 'src/projects/project.model';

import { User } from 'src/users/users.model';

interface TeamCreationOptions {
  name: string;
  creatorId: number;
}

interface UserTeam {
  id: number;
  surname: string;
  name: string;
}

@Table({ tableName: 'teams', createdAt: false, updatedAt: false })
export class Team extends Model<Team, TeamCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  creatorId: number;

  @HasOne(() => Project)
  project: Project;

  @HasMany(() => User)
  users: UserTeam[];
  
  @BelongsToMany(()=>User,() => Invite)
  invites: Invite[];
}
