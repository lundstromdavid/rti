import {
  RTIUnchecked, TRTIUnchecked,
  TTypeConfirmation
} from "../object-types/ValidationTypes";
import { TPrimitive, TPrimitiveToString } from "../types/Primitive";

export type TCustomValidationCallback<T extends TPrimitive> = (value: T) => boolean;

export class PrimitiveValidator<T extends TPrimitive> {
  readonly passed: boolean;
  readonly typeConfirmation: TTypeConfirmation<T>;
  readonly customValidationPassed: boolean | TRTIUnchecked = RTIUnchecked;

  constructor(
    object: any,
    expected: TPrimitiveToString<T>,
    customValidation?: TCustomValidationCallback<T>
  ) {
    const actual = typeof object;
    if (actual !== expected) {
      this.passed = false;
      this.typeConfirmation = {
        actual,
        expected,
      };
    } else {
      if (customValidation) {
        this.customValidationPassed = customValidation(object as T);
        this.passed = this.customValidationPassed;
      } else {
        this.passed = true;
      }
    }
  }
}
