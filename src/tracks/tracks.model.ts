import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Case } from 'src/cases/cases.model';
import { Project } from 'src/projects/project.model';

interface TrackCreationOptions {
  name: string;
  description: string;
}

@Table({ tableName: 'tracks', createdAt: false, updatedAt: false })
export class Track extends Model<Track, TrackCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Case)
  cases: Case[];

  @HasMany(() => Project)
  projects: Project[];
}
