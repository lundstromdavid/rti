import { RTIT } from "../../types/api-types";
import { MUtils } from "../../utils/MUtils";
import { ValidationHelper } from "../../validation/ValidationHelper";
import { RTIString, RTIStringCriteria } from "../primitive/RTIString";
import { RTIBuilder } from "./RTIBuilder";

export class RTIStringBuilder<Optional extends boolean> extends RTIBuilder<Optional, RTIString<Optional>> {
  
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

  public minLength(min: number) {
    this.criteria.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public maxLength(max: number) {
    this.criteria.maxLength = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public lengthInRange(min: number, max: number) {
    return this.minLength(min).maxLength(max);
  }

  public exactLength(length: number) {
    return this.minLength(length).maxLength(length);
  }


  private assertValidMinAndMaxLength() {
    const {minLength, maxLength} = this.criteria;
    ValidationHelper.assertNonNegative(minLength, maxLength);
    ValidationHelper.assertMinHigherThanMax(minLength, maxLength);
    
  }

  public includesAll(
    values: string | string[],
    mode: RTIT.Case = RTIT.Case.sensitive
  ) {
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
  ) {
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
