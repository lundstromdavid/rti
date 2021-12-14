import { Recurse } from "./TRecurse";
/* type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]; */

/*  export type Split<S extends string, D extends string> = Recurse<
  _Split<S, D, []>
>;

type _Split<
  S extends string,
  SplitAt extends string,
  Result extends string[] = []
> = S extends ""
  ? Result
  : S extends `${infer Before}${SplitAt}${infer After}`
  ? { __rec: _Split<After, SplitAt, [...Result, Before]> }
  : [...Result, S]; 
 */

export type SplitSpecial<S extends string, D extends string> = Recurse<
  _SplitSpecial<S, D, []>
>;

type _SplitSpecial<
  S extends string,
  Delimiter extends string,
  Result extends string[] = []
> = S extends ""
  ? Result
  : S extends `${infer KeyName}:${infer WhiteSpace}{${infer ObjectProperties}}${Delimiter}${infer After}`
  ? WhiteSpace extends `${infer Pre}${Delimiter}${infer Post}`
    ? __SplitSpecial<S, Delimiter, Result>
    : _SplitSpecial<
        After,
        Delimiter,
        [...Result, `${KeyName}:{${ObjectProperties}}`]
      >
  : S extends `${infer KeyName}:${infer WhiteSpace}{${infer ObjectProperties}}[]${Delimiter}${infer After}`
  ? WhiteSpace extends `${infer Pre}${Delimiter}${infer Post}`
    ? __SplitSpecial<S, Delimiter, Result>
    : _SplitSpecial<
        After,
        Delimiter,
        [...Result, `${KeyName}:{${ObjectProperties}}[]`]
      >
  : __SplitSpecial<S, Delimiter, Result>;

type __SplitSpecial<S, Delimiter extends string, Result extends string[]> =
  S extends `${infer Before}${Delimiter}${infer After}`
    ? { __rec: _SplitSpecial<After, Delimiter, [...Result, Before]> }
    : [...Result, S];

