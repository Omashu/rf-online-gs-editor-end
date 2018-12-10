import { IsString, IsBoolean, IsNumber } from 'class-validator';

import {
  TypesFiltrateQuery,
  TypesFiltrateQueryProps,
} from 'src/types/filtrateQuery';

import { TypesQueryOrder } from 'src/types/query';

export class Role {
  id?: string;
  name?: string;
  title?: string;
}

export class RoleCreateDto {
  @IsString() readonly title: string;
  @IsString() readonly name: string;
  @IsBoolean() readonly isDefault: boolean;
}

export class RolesDto {
  readonly sort: TypesQueryOrder;
  readonly where: FiltrateQueryPropsWhere;
  @IsNumber() readonly skip: number;
  @IsNumber() readonly take: number;
}

export interface FiltrateQueryPropsWhere {
  readonly name?: string;
  readonly title?: string;
}

export interface FiltrateQueryProps extends TypesFiltrateQueryProps {
  readonly where?: FiltrateQueryPropsWhere;
}

export class FiltrateQuery extends TypesFiltrateQuery {
  constructor(props: FiltrateQueryProps) {
    super(props);
  }
}
