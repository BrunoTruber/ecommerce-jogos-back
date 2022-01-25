import { BaseQueryParametersDto } from 'src/shared/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  status: boolean;
  role: string;
}
