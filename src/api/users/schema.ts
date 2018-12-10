import {
  IsString,
  IsEmail,
  IsDefined,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsLowercase,
  IsInt,
  IsOptional,
} from 'class-validator';

import {
  TypesFiltrateQuery,
  TypesFiltrateQueryProps,
} from 'src/types/filtrateQuery';

import { TypesQueryOrder } from 'src/types/query';
import { Role } from '../roles/schema';

export class User {
  id?: string;
  login?: string;
  email?: string;
  password?: string;
  roleId?: string;
  role?: Role;
}

export class UserRegisterDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  readonly login: string;

  @IsDefined()
  @IsEmail()
  @MaxLength(64)
  @IsLowercase()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class UsersDto {
  readonly sort: TypesQueryOrder;
  readonly where: FiltrateQueryPropsWhere;

  @IsInt()
  @IsOptional()
  readonly skip: number;

  @IsInt()
  @IsOptional()
  readonly take: number;
}

export interface FiltrateQueryPropsWhere {
  readonly login?: string;
}

export interface FiltrateQueryProps extends TypesFiltrateQueryProps {
  readonly where?: FiltrateQueryPropsWhere;
}

export class FiltrateQuery extends TypesFiltrateQuery {
  constructor(props: FiltrateQueryProps) {
    super(props);
  }
}
