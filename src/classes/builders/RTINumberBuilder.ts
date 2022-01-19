import { MUtils } from "../../utils/MUtils";
import { ValidationHelper } from "../../validation/ValidationHelper";
import { RTINumber, RTINumberCriteria } from "../primitive/RTINumber";
import { RTIBuilder } from "./RTIBuilder";



export class RTINumberBuilder<Optional extends boolean> extends RTIBuilder<Optional, RTINumber<Optional>> {

  private readonly criteria: RTINumberCriteria = {};

  private constructor(private readonly optional: Optional) {
    super();
  }

  static required() {
    return new RTINumberBuilder(false);
  }

  static optional() {
    return new RTINumberBuilder(true);
  }

  public min(min: number) {
    this.criteria.minValue = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public max(max: number) {
    this.criteria.maxValue = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public range(min: number, max: number) {
    return this.min(min).max(max);
  }

  public integer() {
    this.criteria.integer = true;
    return this;
  }

  public divisibleBy(nums: number | number[]) {
    this.criteria.divisibleBy = MUtils.asArray(nums);
    return this;
  }

  private assertValidMinAndMaxLength() {
    ValidationHelper.assertMinHigherThanMax(
      this.criteria.minValue,
      this.criteria.maxValue
    );
  }

  // Ugly casts :'(
  lock(): RTINumber<Optional> {
    if (this.optional) {
      return RTINumber.optional(this.criteria) as RTINumber<Optional>;
    } else {
      return RTINumber.required(this.criteria) as RTINumber<Optional>;
    }
  }
}
