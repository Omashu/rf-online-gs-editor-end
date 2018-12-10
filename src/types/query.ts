export interface TypesQueryOrder {
  [columnName: string]:
    | ('ASC' | 'DESC' | 1 | -1)
    | {
        order: 'ASC' | 'DESC';
        nulls: 'NULLS FIRST' | 'NULLS LAST';
      };
}
