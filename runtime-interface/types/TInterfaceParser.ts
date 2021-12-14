import { TypeFromString } from "./TTypeFromString";
import { Recurse } from "./TRecurse";
export type TInterfaceParser<T extends string> =
  T extends `${infer key}:${infer value};${infer rest}`
    ? // Value is optional
      key extends `${infer name}?`
      ? Partial<Record<name, TypeFromString<value>>> & TInterfaceParser<rest>
      : // Value is required
        Record<key, TypeFromString<value>> & TInterfaceParser<rest>
    : {};

export type TInterfaceParserV2<T extends string[]> = Recurse<
  _TInterfaceParserV2<T, {}>
>;

export type _TInterfaceParserV2<
  T extends string[],
  Result extends object = {}
> = T extends [] | [""]
  ? Result
  : T extends [string, ...infer Rest]
  ? Rest extends string[]
    ? T[0] extends `${infer key}:${infer type}`
      ? key extends `${infer name}?`
        ? {
            __rec: _TInterfaceParserV2<
              Rest,
              Partial<Record<name, TypeFromString<type>>> & Result
            >;
          }
        : {
            __rec: _TInterfaceParserV2<
              Rest,
              Record<key, TypeFromString<type>> & Result
            >;
          }
      : never
    : never
  : never;

export type TInterfaceParserV3<T extends string> = Recurse<
  _TInterfaceParserV3<T>
>;

export type _TInterfaceParserV3<T extends string, Result extends object = {}> =
  T extends `${infer key}:${infer value};${infer rest}`
    ? // Value is optional
      key extends `${infer name}?`
      ? {
          __rec: Partial<Record<name, TypeFromString<value>>> &
            TInterfaceParser<rest>;
        }
      : // Value is required
        { __rec: Record<key, TypeFromString<value>> & TInterfaceParser<rest> }
    : Result;
