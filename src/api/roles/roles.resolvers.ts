import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Role } from './role.entity';
import { RolesGuard } from './guards/roles.guard';
import { RolesService } from './roles.service';
import { parseTake, parseOrder, parseSkip } from 'src/utils/query';
import { FiltrateQuery, RoleCreateDto, RolesDto } from './schema';

const pubSub = new PubSub();

@Resolver('Role')
export class RolesResolvers {
  constructor(private readonly rolesService: RolesService) {}

  @Query()
  @UseGuards(RolesGuard)
  roles(@Args() rolesDto: RolesDto) {
    const filtrateQuery = new FiltrateQuery({
      where: rolesDto.where,
      order: parseOrder(rolesDto.sort),
      take: parseTake(rolesDto.take),
      skip: parseSkip(rolesDto.skip),
    });

    return this.rolesService.findAll(filtrateQuery);
  }

  @Query('role')
  @UseGuards(RolesGuard)
  findOneById(
    @Args('id')
    id: string,
  ): Promise<Role> {
    return this.rolesService.findOneById(id);
  }

  @Mutation()
  roleCreate(@Args() createRoleDto: RoleCreateDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }
}
