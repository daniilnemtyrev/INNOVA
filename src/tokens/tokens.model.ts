import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

export interface TokenCreationOptions {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'tokens', createdAt: false, updatedAt: false })
export class Token extends Model<Token, TokenCreationOptions> {
  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => User)
  userId: number;

  @Column({ type: DataType.TEXT })
  refreshToken: string;

  @BelongsTo(() => User)
  user: User;
}
