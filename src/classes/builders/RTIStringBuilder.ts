import { RTIT } from "../../types/api-types";
import { MUtils } from "../../utils/MUtils";
import { ValidationHelper } from "../../validation/ValidationHelper";
import { RTIString, RTIStringCriteria } from "../primitive/RTIString";
import { RTIBuilder } from "./RTIBuilder";

type Length = "maxLength" | "minLength" | "lengthInRange" | "exactLength";

export type TStringBuilder<
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
  includesAll(values: string | string[]): TStringBuilder<Optional, Used>;
  includesSome(values: string | string[]): TStringBuilder<Optional, Used>;
};

interface IStringBuilder<Optional extends boolean>
  extends TStringBuilder<Optional> {}

export class RTIStringBuilder<Optional extends boolean>
  extends RTIBuilder<Optional, RTIString<Optional>>
  implements IStringBuilder<Optional>
{
  private readonly criteria: RTIStringCriteria = {};

  private constructor(private readonly optional: Optional) {
    super();
  }

  static required() {
    return new RTIStringBuilder(false);
  }

  static optional() {
    return new RTIStringBuilder(true);
  }

  public minLength(min: number): TStringBuilder<Optional> {
    this.criteria.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public maxLength(max: number): TStringBuilder<Optional> {
    this.criteria.maxLength = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public lengthInRange(min: number, max: number): TStringBuilder<Optional> {
    this.criteria.minLength = min;
    this.criteria.maxLength = max;
    this.assertValidMinAndMaxLength();
    return this;
  }

  public exactLength(length: number): TStringBuilder<Optional> {
    this.criteria.minLength = length;
    this.criteria.maxLength = length;
    return this;
  }

  private assertValidMinAndMaxLength() {
    const { minLength, maxLength } = this.criteria;
    ValidationHelper.assertNonNegative(minLength, maxLength);
    ValidationHelper.assertMinHigherThanMax(minLength, maxLength);
  }

  public includesAll(
    values: string | string[],
    mode: RTIT.Case = RTIT.Case.sensitive
  ): TStringBuilder<Optional> {
    switch (mode) {
      case RTIT.Case.sensitive:
        this.criteria.includesAllCaseSensitive = MUtils.asArray(values);
        break;
      case RTIT.Case.insensitive:
        this.criteria.includesAllCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  public includesSome(
    values: string | string[],
    mode: RTIT.Case = RTIT.Case.sensitive
  ): TStringBuilder<Optional> {
    switch (mode) {
      case RTIT.Case.sensitive:
        this.criteria.includesSomeCaseSensitive = MUtils.asArray(values);
        break;
      case RTIT.Case.insensitive:
        this.criteria.includesSomeCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  // Ugly casts ;'(
  lock(): RTIString<Optional> {
    if (this.optional) {
      return RTIString.optional(this.criteria) as RTIString<Optional>;
    } else {
      return RTIString.required(this.criteria) as RTIString<Optional>;
    }
  }
}
