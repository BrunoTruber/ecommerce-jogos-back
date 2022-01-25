/* eslint-disable prettier/prettier */
import { BaseQueryParametersDto } from 'src/shared/base-query-parameters.dto';

export class FindGamesQueryDto extends BaseQueryParametersDto {
  gameName: string;
  description: string;
  price: string;
}
