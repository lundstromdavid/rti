import { MUtils } from "../../utils/MUtils";
import { NumberValidationResult } from "../../validation/primitive/NumberValidationResult";
import { TCustomValidationCallback } from "../../validation/primitive/PrimitiveValidator";
import { ValidationHelper } from "../../validation/ValidationHelper";
import { RTIClass } from "../RTIClass";

export type RTINumberRules = {
  minValue?: number;
  maxValue?: number;
  integer?: boolean;
  divisibleBy?: number[];
  customValidation?: TCustomValidationCallback<number>;
};

export class RTINumber<Optional extends boolean> extends RTIClass<NumberValidationResult, Optional> {
  private readonly discriminator = "number";
  private readonly rules: RTINumberRules = {};

  private constructor(private readonly optional: Optional) {
    super();
  }

  static required() {
    return new RTINumber(false);
  }

  static optional() {
    return new RTINumber(true);
  }

  isOptional() {
    return this.optional;
  }

  public min(min: number) {
    this.rules.minValue = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public max(max: number) {
    this.rules.maxValue = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public range(min: number, max: number) {
    return this.min(min).max(max);
  }

  public integer() {
    this.rules.integer = true;
    return this;
  }

  public divisibleBy(nums: number | number[]) {
    this.rules.divisibleBy = MUtils.asArray(nums);
    return this;
  }

  private assertValidMinAndMaxLength() {
    ValidationHelper.assertMinHigherThanMax(
      this.rules.minValue,
      this.rules.maxValue
    );
  }

  validate(value: any): NumberValidationResult {
    return new NumberValidationResult(value, this.rules);
  }
}
