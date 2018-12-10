import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';
import { isObject } from 'util';
import {
  FiltrateQuery,
  FiltrateQueryPropsWhere,
  UserRegisterDto,
} from './schema';

import { RolesService } from '../roles/roles.service';
import { cryptPassword } from 'src/utils/bcrypt';
import { sign } from 'src/utils/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  concateWhereConditions(
    queryBuilder: SelectQueryBuilder<User>,
    where: FiltrateQueryPropsWhere,
  ) {
    if (!isObject(where)) {
      return queryBuilder;
    }

    if (where.login) {
      queryBuilder.where('user.login = :login', { login: where.login });
    }

    return queryBuilder;
  }

  async findAll(
    filtrateQuery: FiltrateQuery,
  ): Promise<{ items: User[]; total: number }> {
    const { order, take, skip, where } = filtrateQuery;
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.skip(skip);
    queryBuilder.take(take);
    queryBuilder.orderBy(order);

    this.concateWhereConditions(queryBuilder, where);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
    };
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByName(name: string): Promise<User> {
    return this.userRepository.findOne({ where: { name } });
  }

  async register(
    register: UserRegisterDto,
  ): Promise<{ token: string; user: User }> {
    const login = register.login.trim();
    const email = register.email.trim();

    const defaultRole = await this.rolesService.findOneDefault();

    if (!defaultRole) {
      throw new Error('Default Role not Registred');
    }

    const password = await cryptPassword(register.password);

    const user = await this.userRepository.save(
      this.userRepository.create({
        login,
        email,
        password,
        roleId: defaultRole.id,
      }),
    );

    const token = sign({ id: user.id });

    return { token, user };
  }
}
