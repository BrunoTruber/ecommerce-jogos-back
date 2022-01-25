import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class ChangePasswordDto {
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
