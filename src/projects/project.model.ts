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
import { Case } from 'src/cases/cases.model';
import { Tasks } from 'src/tasks/tasks.model';
import { Team } from 'src/teams/teams.model';
import { Track } from 'src/tracks/tracks.model';
import { User } from 'src/users/users.model';

interface ProjectCreationOptions {
  trackId: number;
  trackName: string;
  trackDescription: string;
  caseId: number;
  caseName: string;
  caseDescription: string;
  name: string;
  description: string;
  auditorium: string;
  prototype: string;
  economy: string;
  marketing: string;
}

@Table({ tableName: 'projects', createdAt: false, updatedAt: false })
export class Project extends Model<Project, ProjectCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER, allowNull: true })
  trackId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  trackName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  trackDescription: string;

  @ForeignKey(() => Case)
  @Column({ type: DataType.INTEGER, allowNull: true })
  caseId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  caseName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  caseDescription: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  prototype: string;

  @Column({ type: DataType.STRING, allowNull: false })
  auditorium: string;

  @Column({ type: DataType.STRING, allowNull: false })
  economy: string;

  @Column({ type: DataType.STRING, allowNull: false })
  marketing: string;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: true })
  teamId: number;

  @BelongsTo(() => Team)
  team: Team;

  @HasOne(() => Tasks)
  task: Tasks;

  @HasMany(() => User)
  users: User[];

  @BelongsTo(() => Track)
  track: Track;

  @BelongsTo(() => Case)
  cases: Case;
}
