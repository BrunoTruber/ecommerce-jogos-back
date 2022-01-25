/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Game } from './game.entity';
import { FindGamesQueryDto } from './dtos/find-game-query.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGameDto } from './dtos/createGame.dto';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async createGame(
    createGameDto: CreateGameDto,
    //role: UserRole,
  ): Promise<Game> {
    const { gameName, images, description, price, supplyId } = createGameDto;
    const game = this.create();
    game.gameName = gameName;
    game.images = images;
    game.price = price;
    game.description = description;
    game.supplyId = supplyId;

    try {
      await game.save();
      return game;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('The game was already registered');
      } else {
        throw new InternalServerErrorException(
          'Something when wrong while registering the game',
        );
      }
    }
  }

  async findGames(
    queryDto: FindGamesQueryDto,
  ): Promise<{ games: Game[]; total: number }> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { gameName, description, price } = queryDto;
    const query = this.createQueryBuilder('game');

    if (gameName) {
      query.andWhere('game.gameName ILIKE :gameName', {
        gameName: `%${gameName}%`,
      });
    }

    if (description) {
      query.andWhere('game.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (price) {
      query.andWhere('game.price ILIKE :price', { price: `%${price}%` });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['game.gameName', 'game.description', 'game.price']);

    const [games, total] = await query.getManyAndCount();

    return { games, total };
  }
}
