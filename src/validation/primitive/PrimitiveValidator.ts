import { RTIT } from "../../types/api-types";
import { TPrimitive, TPrimitiveToString } from "../../types/local-types";


export type TCustomValidationCallback<T extends TPrimitive> = (
  value: T
) => boolean;

export class PrimitiveValidator<T extends TPrimitive> {
  readonly passedBaseTest: boolean = false;
  readonly typeCheck: RTIT.TypeCheck<T>;
  readonly customValidationPassed: RTIT.CriteriaValidation = RTIT.CriteriaValidation.unchecked;

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
        this.customValidationPassed = RTIT.CriteriaValidation.fromBool(customValidation(object as T));
        this.passedBaseTest = this.customValidationPassed === RTIT.CriteriaValidation.passed;
      } else {
        this.customValidationPassed = RTIT.CriteriaValidation.noRestriction;
        this.passedBaseTest = true;
      }
    }
  }
}
