import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface MessagesCreationOptions {
  userId: number;
  name: string;
  text: string;
}

@Table({ tableName: 'messages' })
export class Messages extends Model<Messages, MessagesCreationOptions> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  text: string;

  @BelongsTo(() => User)
  users: User;
}
