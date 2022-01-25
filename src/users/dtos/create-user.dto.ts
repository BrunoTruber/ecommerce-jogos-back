/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Enter your first name' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'Enter your last name' })
  @ApiProperty()
  lastName: string;

  @IsNotEmpty({ message: 'Enter your CPF' })
  @MaxLength(11, {
    message: 'Enter a valid CPF',
  })
  @MinLength(11, {
    message: 'Enter a valid CPF',
  })
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({ message: 'Enter your phone' })
  @MaxLength(16, {
    message:
      'the phone must have DDI + DDD + phone number (Ex: +55 11 912345678)',
  })
  @MinLength(14, {
    message:
      'the phone must have DDI + DDD + phone number (Ex: +55 11 912345678)',
  })
  @ApiProperty()
  phone: string;

  @IsNotEmpty({ message: 'Enter your address' })
  @ApiProperty()
  address: string;

  @IsNotEmpty({ message: 'Enter an email address' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @ApiProperty({
    description:
      'The user registration email must be unique in the application',
  })
  email: string;

  @IsNotEmpty({ message: 'Enter a password' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(32, { message: 'Password must have a maximum of 32 characters' })
  @IsString({ message: 'Enter a valid password' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, one number and one symbol',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty({ message: 'Enter password confirmation' })
  @MinLength(6, {
    message: 'Password confirmation must have at least 6 characters',
  })
  @MaxLength(32, {
    message: 'Password confirmation must have a maximum of 32 characters',
  })
  @IsString({ message: 'Enter a valid password confirmation' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password confirmation must contain at least one uppercase letter, one lowercase letter, one number and one symbol',
  })
  @ApiProperty()
  passwordConfirmation: string;
}
