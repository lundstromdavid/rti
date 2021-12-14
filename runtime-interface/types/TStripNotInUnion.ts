/* export type StripNotInUnion<T extends string, Union> = T extends ""
  ? ""
  : T extends `${infer Head}${infer Tail}`
  ? Head extends Union
    ? `${Head}${StripNotInUnion<Tail, Union>}`
    : StripNotInUnion<Tail, Union>
  : never;
 */

import { Recurse } from "./TRecurse";

/*
    https://dev.to/susisu/how-to-create-deep-recursive-types-5fgg

    
type Repeat<T, N extends number> = Recurse<_Repeat<T, N, []>>;

type _Repeat<T, N extends number, A extends T[]> = A["length"] extends N
  ? A
  : { __rec: _Repeat<T, N, [T, ...A]> };
*/

export type StripNotInUnionForEach<T extends string[], U> = Recurse<
  _StripNotInUnionForEach<T, U, []>
>;

type _StripNotInUnionForEach<
  T extends string[],
  U,
  Result extends string[] = []
> = T extends []
  ? Result
  : T extends [string, ...infer Rest]
  ? Rest extends string[]
    ? {
        __rec: _StripNotInUnionForEach<
          Rest,
          U,
          //@ts-ignore
          [...Result, InferType<StripNotInUnion<T[0], U>>]
        >;
      }
    : never
  : never;

type InferType<T extends unknown> = T extends infer K ? K : never;

export type StripNotInUnion<T extends string, Union> = Recurse<
  _StripNotInUnion<T, Union>
>;

type _StripNotInUnion<T extends string, Union, Result extends string = ""> =
  T extends ""
    ? Result
    : T extends `${infer Head}${infer Tail}`
    ? Head extends Union
      ? { __rec: _StripNotInUnion<Tail, Union, `${Result}${Head}`> }
      : { __rec: _StripNotInUnion<Tail, Union, Result> }
    : never;

// Interesting
/* type ArrayMap<T extends string[]> = T[-1] */

export type StripInUnion<T extends string, Union> = Recurse<
  _StripInUnion<T, Union>
>;

type _StripInUnion<T extends string, Union, Result extends string = ""> =
  T extends ""
    ? Result
    : T extends `${infer Head}${infer Tail}`
    ? Head extends Union
      ? { __rec: _StripInUnion<Tail, Union, Result> }
      : { __rec: _StripInUnion<Tail, Union, `${Result}${Head}`> }
    : never;
