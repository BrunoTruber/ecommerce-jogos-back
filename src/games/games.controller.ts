/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  // Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from 'src/categories/category.entity';
//import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { CreateGameDto } from './dtos/createGame.dto';
import { FindGamesQueryDto } from './dtos/find-game-query.dto';
import { UpdateGameDto } from './dtos/updateGame.dto';
import { GamesService } from './games.service';

@Controller('games')
@ApiTags('games')
//@UseGuards(AuthGuard(), RolesGuard)
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getAllGames() {
    return this.gamesService.getAllGames();
  }

  @Get('findGameById/:id')
  async findGameById(@Param('id') id: string) {
    const game = await this.gamesService.findGameById(id);
    return {
      game,
      message: 'found game',
    };
  }

  // @Get('findGamesByQuery')
  // async getGamesByCategory(@Query() query: FindGamesQueryDto) {
  //   const found = await this.gamesService.getGamesByCategory(query);

  //   return {
  //     found,
  //     message: 'Games found',
  //   };
  // }

  @Post()
  //@Role(UserRole.ADMIN)
  //@UseGuards(JwtAuthenticationGuard)
  async createGame(
    @Body(ValidationPipe) game: CreateGameDto,
    category: Category,
  ) {
    const newGame = await this.gamesService.createGame(game, category);
    return {
      newGame,
      message: 'Game was successfully registered! ',
    };
  }

  @Patch(':id')
  async updateGame(
    @Body() updateGameDto: UpdateGameDto,
    @Param('id') id: string,
  ) {
    return this.gamesService.updateGame(updateGameDto, id);
  }

  @Delete('/:id')
  //@Role(UserRole.ADMIN)
  async deleteGame(@Param('id') id: string) {
    await this.gamesService.deleteGame(id);
    return { message: 'The game was remove.' };
  }
}
