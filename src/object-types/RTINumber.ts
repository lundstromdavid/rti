import { MUtils } from "../utils/MUtils";
import { TCustomValidationCallback } from "../validation/PrimitiveValidator";
import { RTINumberValidationResult } from "../validation/RTINumberValidationResult";
import { RTIValidation } from "../validation/RTIValidation";
import { AbsRTIType } from "./AbsRTIType";

export type RTINumberRules = {
  minValue?: number;
  maxValue?: number;
  integer?: boolean;
  divisibleBy?: number[];
  customValidation?: TCustomValidationCallback<number>;
};

export class RTINumber extends AbsRTIType<number> {
  private readonly discriminator = "number";
  private readonly rules: RTINumberRules = {};

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
    RTIValidation.assertMinHigherThanMax(
      this.rules.minValue,
      this.rules.maxValue
    );
  }

  validate(value: any): RTINumberValidationResult {
    return new RTINumberValidationResult(value, this.rules);
  }
}
