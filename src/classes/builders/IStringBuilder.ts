import { RTIString } from "../primitive/RTIString";

type Length = "maxLength" | "minLength" | "lengthInRange" | "exactLength";

type TStringBuilder<
  Optional extends boolean,
  Used extends keyof _TStringBuilder<any, any> | "" = ""
> = {
  lock(): RTIString<Optional>;
} & Omit<_TStringBuilder<Optional, Used>, Used>;

type _TStringBuilder<
  Optional extends boolean,
  Used extends keyof _TStringBuilder<any, any> | "" = ""
> = {
  minLength(min: number): TStringBuilder<Optional, Used | Length>;
  maxLength(max: number): TStringBuilder<Optional, Used | Length>;
  lengthInRange(
    min: number,
    max: number
  ): TStringBuilder<Optional, Used | Length>;
  exactLength(length: number): TStringBuilder<Optional, Used | Length>;
  includesAll(
    values: string | string[]
  ): TStringBuilder<Optional, Used | "includesAll">;
  includesAllCaseInsensitive(
    values: string | string[]
  ): TStringBuilder<Optional, Used | "includesAllCaseInsensitive">;
  includesSome(
    values: string | string[]
  ): TStringBuilder<Optional, Used | "includesSome">;
  includesSomeCaseInsensitive(
    values: string | string[]
  ): TStringBuilder<Optional, Used | "includesAllCaseInsensitive">;
};

export interface IStringBuilder<Optional extends boolean>
  extends TStringBuilder<Optional> {}