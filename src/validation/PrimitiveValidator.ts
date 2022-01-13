import {
  ESingleValidation,
  TTypeCheck as TTypeCheck,
} from "../object-types/ValidationTypes";
import { TPrimitive, TPrimitiveToString } from "../types/Primitive";

export type TCustomValidationCallback<T extends TPrimitive> = (
  value: T
) => boolean;

export class PrimitiveValidator<T extends TPrimitive> {
  readonly passedBaseTest: boolean = false;
  readonly typeCheck: TTypeCheck<T>;
  readonly customValidationPassed: ESingleValidation = ESingleValidation.unchecked;

  constructor(
    object: any,
    expected: TPrimitiveToString<T>,
    customValidation?: TCustomValidationCallback<T>
  ) {
    const actual = typeof object;
    this.typeCheck = {
      actual,
      expected,
      passed: actual === expected,
    };

    if (this.typeCheck.passed) {
      if (customValidation) {
        this.customValidationPassed = ESingleValidation.fromBool(customValidation(object as T));
        this.passedBaseTest = this.customValidationPassed === ESingleValidation.passed;
      } else {
        this.customValidationPassed = ESingleValidation.noRestriction;
        this.passedBaseTest = true;
      }
    }
  }
}
