import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TimetableCreationOptions {
  title: string;
  start: Date;
  end: Date;
}

@Table({ tableName: 'timetable', createdAt: false, updatedAt: false })
export class Timetable extends Model<Timetable, TimetableCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: DataType.DATE, unique: false, allowNull: false })
  start: Date;

  @Column({ type: DataType.DATE, unique: false, allowNull: true })
  end: Date;
}
