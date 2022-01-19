
import { RTIT } from "../../types/api-types";
import assert from "../../utils/Assert";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class StringLiteralValidationResult implements RTIT.IStringLiteralValidation {
  readonly passed: boolean;
  readonly typeCheck: RTIT.TypeCheck<string>;
  readonly valueAllowed: RTIT.CriteriaValidation = RTIT.CriteriaValidation.unchecked;

  readonly confirmedValue?: string;

  constructor(value: any, readonly allowedValues: string[]) {
    const { passedBaseTest, typeCheck } = new PrimitiveValidator<string>(
      value,
      "string"
    );

    this.typeCheck = typeCheck;
    if (passedBaseTest) {
      this.confirmedValue = value as string;
      this.valueAllowed = this.checkValueAllowed();
      this.passed = this.valueAllowed === RTIT.CriteriaValidation.passed;
    } else {
      this.passed = false;
    }
  }

  private checkValueAllowed(): RTIT.CriteriaValidation {
    return RTIT.CriteriaValidation.fromBool(
      this.allowedValues.includes(assert(this.confirmedValue))
    );
  }
}
