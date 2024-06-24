import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface NewsCreationOptions {
  title: string;
  text: string;
  imagePath: string;
  published: Date;
}

@Table({ tableName: 'news', createdAt: false, updatedAt: false })
export class News extends Model<News, NewsCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: 'longtext', unique: false, allowNull: false })
  text: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imagePath: string;

  @Column({ type: DataType.DATE, allowNull: false })
  published: Date;
}
