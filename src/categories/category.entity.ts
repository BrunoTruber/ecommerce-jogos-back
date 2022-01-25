import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '../games/game.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  // @OneToMany(() => Game, (game: Game) => game.category)
  // @JoinTable()
  // games: Game[];

  // games: Game[];

  @ManyToMany(() => Game, (game: Game) => game.category)
  games: Game[];
}

// export default Category;
