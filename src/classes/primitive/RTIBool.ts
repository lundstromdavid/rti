import { BooleanValidationResult } from "../../validation/primitive/BooleanValidationResult";
import { RTIClass } from "../RTIClass";

export class RTIBool<Optional extends boolean> extends RTIClass<BooleanValidationResult, Optional> {
  private readonly type = "boolean";

  private constructor(private readonly optional: Optional) {
    super();
  }

  static required() {
    return new RTIBool(false);
  }

  static optional() {
    return new RTIBool(true);
  }

  isOptional() {
    return this.optional;
  }

  validate(value: any): BooleanValidationResult {
    return new BooleanValidationResult(value);
  }
}
