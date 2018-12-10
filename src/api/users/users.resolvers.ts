import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersGuard } from './guards/users.guard';
import { UsersService } from './users.service';
import { parseTake, parseOrder, parseSkip } from 'src/utils/query';
import { FiltrateQuery, UsersDto, UserRegisterDto } from './schema';

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  @UseGuards(UsersGuard)
  async users(@Args() usersDto: UsersDto) {
    const filtrateQuery = new FiltrateQuery({
      where: usersDto.where,
      order: parseOrder(usersDto.sort),
      take: parseTake(usersDto.take),
      skip: parseSkip(usersDto.skip),
    });

    const { items, total } = await this.usersService.findAll(filtrateQuery);

    return {
      items,
      total,
    };
  }

  @Query('user')
  @UseGuards(UsersGuard)
  findOneById(
    @Args('id')
    id: string,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation()
  userLogin() {}

  @Mutation()
  userRegister(
    @Args() registerUserDto: UserRegisterDto,
  ): Promise<{ token: string; user: User }> {
    return this.usersService.register(registerUserDto);
  }
}
