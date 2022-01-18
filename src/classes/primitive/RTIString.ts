import { RTI } from "../../RTI";
import { RTIT } from "../../types/api-types";
import { MUtils } from "../../utils/MUtils";
import { TCustomValidationCallback } from "../../validation/primitive/PrimitiveValidator";
import { StringValidationResult } from "../../validation/primitive/StringValidationResult";
import { ValidationHelper, ValidationTypes } from "../../validation/ValidationHelper";
import { RTIClass } from "../RTIClass";

export type RTIStringProps = {
  minLength?: number;
  maxLength?: number;
  includesAllCaseSensitive?: string[];
  includesAllCaseInsensitive?: string[];
  includesSomeCaseSensitive?: string[];
  includesSomeCaseInsensitive?: string[];
  customValidation?: TCustomValidationCallback<string>;
};

export class RTIString<Optional extends boolean> extends RTIClass<StringValidationResult, Optional> {
  private readonly discriminator = "RTIString";
  private readonly props: RTIStringProps = {};


  private constructor(private readonly optional: Optional) {
    super();
  }

  static required() {
    return new RTIString(false);
  }

  static optional() {
    return new RTIString(true);
  }

  isOptional() {
    return this.optional;
  }


  public minLength(min: number) {
    this.props.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public maxLength(max: number) {
    this.props.maxLength = max;
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
    const {minLength, maxLength} = this.props;
    ValidationHelper.assertNonNegative(minLength, maxLength);
    ValidationHelper.assertMinHigherThanMax(minLength, maxLength);
    
  }

  public includesAll(
    values: string | string[],
    mode: RTIT.Case = RTIT.Case.sensitive
  ) {
    switch (mode) {
      case RTIT.Case.sensitive:
        this.props.includesAllCaseSensitive = MUtils.asArray(values);
        break;
      case RTIT.Case.insensitive:
        this.props.includesAllCaseInsensitive = MUtils.asArray(values);
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
        this.props.includesSomeCaseSensitive = MUtils.asArray(values);
        break;
      case RTIT.Case.insensitive:
        this.props.includesSomeCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  public validate(value: any): StringValidationResult {
    return new StringValidationResult(value, this.props);
  }
}