import { StringLiteralValidationResult } from "../../validation/primitive/StringLiteralValidationResult";
import { RTIClass } from "../RTIClass";

export class RTIStringLiteral<
  Optional extends boolean,
  T extends string
> extends RTIClass<StringLiteralValidationResult, Optional> {
  private readonly discriminator = "stringLiteral";
  private readonly allowedValues: T[];

  constructor(private readonly optional: Optional, ...allowedValues: T[]) {
    super();
    this.allowedValues = allowedValues;
  }

  static required<T extends string>(...allowedValues: T[]) {
    return new RTIStringLiteral<false, T>(false, ...allowedValues);
  }

  static optional<T extends string>(...allowedValues: T[]) {
    return new RTIStringLiteral<true, T>(true, ...allowedValues);
  }

  isOptional() {
    return this.optional;
  }

  validate(value: any): StringLiteralValidationResult {
    return new StringLiteralValidationResult(value, this.allowedValues);
  }
}
