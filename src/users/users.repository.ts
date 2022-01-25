import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { CredentialsDto } from 'src/auth/credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { name, lastName, cpf, phone, address, email, password } =
      createUserDto;

    const user = this.create();

    user.name = name;
    user.lastName = lastName;
    user.cpf = cpf;
    user.phone = phone;
    user.address = address;
    user.email = email;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Email address already in use');
      } else {
        throw new InternalServerErrorException('Error saving user to database');
      }
    }
  }

  async findUsersByQuery(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;

    const { email, name, status, role, cpf, phone } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email)
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });

    if (name) query.andWhere('user.name ILIKE :name', { name: `%${name}%` });

    if (role) query.andWhere('user.role ILIKE :role', { role });

    if (cpf) query.andWhere('user.cpf ILIKE :cpf', { cpf: `%${cpf}%` });

    if (phone)
      query.andWhere('user.phone ILIKE :phone', { phone: `%${phone}%` });

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select([
      'user.name',
      'user.email',
      'user.role',
      'user.status',
      'user.cpf',
      'user.phone',
    ]);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;

    const user = await this.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async changePassword(id: string, password: string) {
    const user = await this.findOne(id);
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.recoverToken = null;
    await user.save();
  }
}
