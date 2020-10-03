export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type HashMap<T> = {
  [key in string]: T;
}
