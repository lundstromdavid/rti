export type Recurse<T> = T extends { __rec: unknown }
  ? Recurse<_Recurse<T>>
  : T;

type _Recurse<T> = T extends { __rec: never }
  ? never
  : T extends { __rec: { __rec: infer U } }
  ? { __rec: _Recurse<U> }
  : T extends { __rec: infer U }
  ? U
  : T;
