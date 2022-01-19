import { MUtils } from "../../utils/MUtils";
import { ValidationHelper } from "../../validation/ValidationHelper";
import { RTIString, RTIStringCriteria } from "../primitive/RTIString";
import { IStringBuilder } from "./IStringBuilder";
import { RTIBuilder } from "./RTIBuilder";



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

  public minLength(min: number): IStringBuilder<Optional> {
    this.criteria.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public maxLength(max: number): IStringBuilder<Optional> {
    this.criteria.maxLength = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public lengthInRange(min: number, max: number): IStringBuilder<Optional> {
    this.criteria.minLength = min;
    this.criteria.maxLength = max;
    this.assertValidMinAndMaxLength();
    return this;
  }

  public exactLength(length: number): IStringBuilder<Optional> {
    this.criteria.minLength = length;
    this.criteria.maxLength = length;
    return this;
  }

  private assertValidMinAndMaxLength() {
    const { minLength, maxLength } = this.criteria;
    ValidationHelper.assertNonNegative(minLength, maxLength);
    ValidationHelper.assertMinHigherThanMax(minLength, maxLength);
  }

  public includesAll(values: string | string[]): IStringBuilder<Optional> {
    this.criteria.includesAllCaseSensitive = MUtils.asArray(values);
    return this;
  }

  public includesAllCaseInsensitive(
    values: string | string[]
  ): IStringBuilder<Optional> {
    this.criteria.includesAllCaseInsensitive = MUtils.asArray(values);
    return this;
  }

  public includesSome(values: string | string[]): IStringBuilder<Optional> {
    this.criteria.includesSomeCaseSensitive = MUtils.asArray(values);
    return this;
  }

  public includesSomeCaseInsensitive(
    values: string | string[]
  ): IStringBuilder<Optional> {
    this.criteria.includesSomeCaseInsensitive = MUtils.asArray(values);
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
