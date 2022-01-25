import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Enter a valid name' })
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString({ message: 'Enter a valid name' })
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString({ message: 'Enter a valid phone' })
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString({ message: 'enter a valid address' })
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  @IsOptional()
  @ApiProperty()
  role: UserRole;

  @IsOptional()
  @ApiProperty()
  status: boolean;
}
