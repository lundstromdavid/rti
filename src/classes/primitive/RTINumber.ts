import { NumberValidationResult } from "../../validation/primitive/NumberValidationResult";
import { TCustomValidationCallback } from "../../validation/primitive/PrimitiveValidator";
import { RTIClass } from "../RTIClass";

export type RTINumberCriteria = {
  minValue?: number;
  maxValue?: number;
  integer?: boolean;
  divisibleBy?: number[];
  customValidation?: TCustomValidationCallback<number>;
};

export class RTINumber<Optional extends boolean> extends RTIClass<NumberValidationResult, Optional> {
  
  private readonly discriminator = "number";

  private constructor(private readonly criteria: RTINumberCriteria, private readonly optional: Optional) {
    super();
  }

  static required(criteria: RTINumberCriteria) {
    return new RTINumber(criteria, false);
  }

  static optional(criteria: RTINumberCriteria) {
    return new RTINumber(criteria, true);
  }

  isOptional() {
    return this.optional;
  }

  validate(value: any): NumberValidationResult {
    return new NumberValidationResult(value, this.criteria);
  }
}
