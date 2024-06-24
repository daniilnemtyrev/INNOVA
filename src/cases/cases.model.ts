import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from 'src/projects/project.model';
import { Track } from 'src/tracks/tracks.model';

interface CaseCreationOptions {
  name: string;
  trackId: number;
  description: string;
}

@Table({ tableName: 'cases', createdAt: false, updatedAt: false })
export class Case extends Model<Case, CaseCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  name: string;

  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER, allowNull: true })
  trackId: number;

  @Column({ type: 'longtext', allowNull: true })
  description: string;

  @BelongsTo(() => Track)
  tracks: Track;

  @HasMany(() => Project)
  projects: Project[];
}
