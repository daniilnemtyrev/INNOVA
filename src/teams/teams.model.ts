import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from 'src/projects/project.model';

import { User } from 'src/users/users.model';

interface TeamCreationOptions {
  name: string;
}

interface UserTeam {
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

  @HasOne(() => Project)
  project: Project;

  @HasMany(() => User)
  users: UserTeam[];
}
