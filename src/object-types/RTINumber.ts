import { MUtils } from "../utils/MUtils";
import { TCustomValidationCallback } from "../validation/PrimitiveValidator";
import { RTINumberValidationResult } from "../validation/RTINumberValidationResult";
import { RTIValidation } from "../validation/RTIValidation";
import { AbsRTIType } from "./AbsRTIType";

export type RTINumberProps = {
  minValue?: number;
  maxValue?: number;
  integer?: boolean;
  divisibleBy?: number[];
  customValidation?: TCustomValidationCallback<number>;
};

export class RTINumber extends AbsRTIType<number> {
  private readonly discriminator = "number";
  private readonly props: RTINumberProps = {};

  public min(min: number) {
    this.props.minValue = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public max(max: number) {
    this.props.maxValue = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public range(min: number, max: number) {
    return this.min(min).max(max);
  }

  public integer() {
    this.props.integer = true;
    return this;
  }

  public divisibleBy(nums: number | number[]) {
    this.props.divisibleBy = MUtils.asArray(nums);
    return this;
  }

  private assertValidMinAndMaxLength() {
    RTIValidation.assertMinHigherThanMax(
      this.props.minValue,
      this.props.maxValue
    );
  }

  validate(value: any): RTINumberValidationResult {
    return new RTINumberValidationResult(value, this.props);
  }
}
