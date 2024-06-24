import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUser {
  readonly id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 20)
  readonly password: string;
}
