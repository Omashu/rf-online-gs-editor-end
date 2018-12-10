import { isObject } from 'util';

export function parseOrder(sortOrder: object) {
  if (!isObject(sortOrder)) {
    return {};
  }

  return Object.keys(sortOrder)
    .filter(key => [1, -1].indexOf(sortOrder[key]) !== -1)
    .reduce(
      (acc, cur) =>
        Object.assign(acc, { [cur]: sortOrder[cur] === 1 ? 'DESC' : 'ASC' }),
      {},
    );
}

export function parseTake(
  take?: number,
  min: number = 1,
  max: number = 100,
  def: number = 10,
) {
  if (!isFinite(take)) {
    return def;
  }

  if (take < min) {
    return min;
  }

  if (take <= 0) {
    return 1;
  }

  if (take > max) {
    return max;
  }

  return take;
}

export function parseSkip(skip?: number) {
  if (!isFinite(skip)) {
    return 0;
  }

  if (skip < 0) {
    return 0;
  }

  return skip;
}
