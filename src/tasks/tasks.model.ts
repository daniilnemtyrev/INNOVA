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
import { User } from 'src/users/users.model';

interface TaskCreationOptions {
  userId: number;
  projectId: number;
  description: string;
}

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks, TaskCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER, allowNull: false })
  projectId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsTo(() => Project)
  project: Project;

  @BelongsTo(() => User)
  user: User;
}
