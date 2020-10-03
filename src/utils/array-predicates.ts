type Empty = null | undefined;
type NotEmpty = Exclude<any, Empty>;

export const isEmpty = (item: any): item is Empty => {
  return item === null || item === undefined;
}

export const isNotEmpty = (item: any): item is NotEmpty => {
  return !isEmpty(item);
}
