import { kebabCase } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Role } from './role.entity';
import { isObject } from 'util';
import {
  FiltrateQuery,
  FiltrateQueryPropsWhere,
  RoleCreateDto,
} from './schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  concateWhereConditions(
    queryBuilder: SelectQueryBuilder<Role>,
    where: FiltrateQueryPropsWhere,
  ) {
    if (!isObject(where)) {
      return queryBuilder;
    }

    if (where.name) {
      queryBuilder.where('role.name = :name', { name: where.name });
    }

    if (where.title) {
      queryBuilder.where('role.title ~ :title', {
        title: where.title,
      });
    }

    return queryBuilder;
  }

  async findAll(
    filtrateQuery: FiltrateQuery,
  ): Promise<{ items: Role[]; total: number }> {
    const { order, take, skip, where } = filtrateQuery;
    const queryBuilder = this.roleRepository.createQueryBuilder('role');

    queryBuilder.skip(skip);
    queryBuilder.take(take);
    queryBuilder.orderBy(order);

    this.concateWhereConditions(queryBuilder, where);

    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, total };
  }

  findOneById(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  findOneByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } });
  }

  create(role: RoleCreateDto): Promise<Role> {
    return this.roleRepository.save(
      this.roleRepository.create({
        title: role.title,
        name: kebabCase(role.name || role.title).trim(),
        isDefault: role.isDefault,
      }),
    );
  }
}
