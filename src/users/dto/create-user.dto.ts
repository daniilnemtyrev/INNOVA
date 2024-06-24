import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  readonly id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  readonly imagePath: string;

  readonly surname: string;

  readonly name: string;

  readonly patronymic: string;

  readonly post_status: string;

  readonly place_of_work_stud: string;

  readonly birthdate: string;

  readonly phone: string;

  readonly move_to: string;

  readonly move_from: string;

  readonly request_status: string;

  readonly status: string;

  @IsNotEmpty()
  @Length(4, 20)
  readonly password: string;
}
