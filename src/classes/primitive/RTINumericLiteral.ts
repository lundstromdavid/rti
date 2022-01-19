import { NumericLiteralValidationResult } from "../../validation/primitive/NumericLiteralValidationResult";
import { RTIClass } from "../RTIClass";

export class RTINumericLiteral<
  Optional extends boolean,
  T extends number
> extends RTIClass<NumericLiteralValidationResult, Optional> {
  private readonly discriminator = "numericLiteral";
  private readonly allowedValues: T[];

  constructor(private readonly optional: Optional, ...allowedValues: T[]) {
    super();
    this.allowedValues = allowedValues;
  }

  static required<T extends number>(...allowedValues: T[]) {
    return new RTINumericLiteral<false, T>(false, ...allowedValues);
  }

  static optional<T extends number>(...allowedValues: T[]) {
    return new RTINumericLiteral<true, T>(true, ...allowedValues);
  }

  isOptional() {
    return this.optional;
  }

  validate(value: any): NumericLiteralValidationResult {
    return new NumericLiteralValidationResult(value, this.allowedValues);
  }
}
