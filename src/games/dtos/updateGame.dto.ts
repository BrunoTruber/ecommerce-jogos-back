/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  gameName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  images: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  supplyId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  categoryId: string;
}
