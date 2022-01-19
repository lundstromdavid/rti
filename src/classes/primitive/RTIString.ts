import { TCustomValidationCallback } from "../../validation/primitive/PrimitiveValidator";
import { StringValidationResult } from "../../validation/primitive/StringValidationResult";
import { RTIClass } from "../RTIClass";

export type RTIStringCriteria = {
  minLength?: number;
  maxLength?: number;
  includesAllCaseSensitive?: string[];
  includesAllCaseInsensitive?: string[];
  includesSomeCaseSensitive?: string[];
  includesSomeCaseInsensitive?: string[];
  customValidation?: TCustomValidationCallback<string>;
};

export class RTIString<Optional extends boolean> extends RTIClass<StringValidationResult, Optional> {
  private readonly discriminator = "RTIString";


  private constructor(private readonly criteria: RTIStringCriteria, private readonly optional: Optional) {
    super();
  }

  static required(criteria: RTIStringCriteria) {
    return new RTIString(criteria, false);
  }

  static optional(criteria: RTIStringCriteria) {
    return new RTIString(criteria, true);
  }

  isOptional() {
    return this.optional;
  }

  public validate(value: any): StringValidationResult {
    return new StringValidationResult(value, this.criteria);
  }
}
