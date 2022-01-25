/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Game } from 'src/games/game.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  user: User;

  @IsNotEmpty()
  @ApiProperty()
  games: Game;
}
