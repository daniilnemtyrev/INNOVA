import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SponsorsCreationOptions {
  link: string;
  logo: string;
}

@Table({ tableName: 'sponsors', createdAt: false, updatedAt: false })
export class Sponsors extends Model<Sponsors, SponsorsCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @Column({ type: DataType.STRING, allowNull: false })
  logo: string;
}
