import { OrderByCondition } from 'typeorm';

type order = OrderByCondition;
type take = number;
type skip = number;
type where = object;

export class TypesFiltrateQueryProps {
  order?: order;
  take?: take;
  skip?: skip;
  where?: where;
}

export class TypesFiltrateQuery {
  order: order;
  take: take;
  skip: skip;
  where: where;

  constructor(props: TypesFiltrateQueryProps) {
    this.order = props.order;
    this.take = props.take;
    this.skip = props.skip;
    this.where = props.where;
  }
}
