import { BooleanValidationResult } from "../../validation/primitive/BooleanValidationResult";
import { AbsRTIObject } from "../AbsRTIObject";
import { IBooleanValidation } from "../../validation/ValidationTypes";

export class RTIBool extends AbsRTIObject<boolean> {
  private readonly type = "boolean";

  validate(value: any): BooleanValidationResult {
    return new BooleanValidationResult(value);
  }
}
