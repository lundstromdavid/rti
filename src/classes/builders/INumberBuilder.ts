import { RTINumber } from "../primitive/RTINumber";

type Value = "min" | "max" | "range";

type TNumberBuilder<
  Optional extends boolean,
  Used extends keyof _TNumberBuilder<any, any> | "" = ""
> = {
  lock(): RTINumber<Optional>;
} & Omit<_TNumberBuilder<Optional, Used>, Used>;

type _TNumberBuilder<
  Optional extends boolean,
  Used extends keyof _TNumberBuilder<any, any> | "" = ""
> = {
  min(min: number): TNumberBuilder<Optional, Used | Value>;
  max(max: number): TNumberBuilder<Optional, Used | Value>;
  range(min: number, max: number): TNumberBuilder<Optional, Used | Value>;
  integer(): TNumberBuilder<Optional, Used | "integer">;
  divisibleBy(
    nums: number | number[]
  ): TNumberBuilder<Optional, Used | "divisibleBy">;
};

export interface INumberBuilder<Optional extends boolean>
  extends TNumberBuilder<Optional> {}
