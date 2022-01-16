import { BooleanValidationResult } from "../../validation/primitive/BooleanValidationResult";
import { RTIClass } from "../RTIClass";

export class RTIBool extends RTIClass<BooleanValidationResult> {
  private readonly type = "boolean";

  validate(value: any): BooleanValidationResult {
    return new BooleanValidationResult(value);
  }
}
