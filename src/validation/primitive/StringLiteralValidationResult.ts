import {
	CriteriaValidation, IStringLiteralValidation,
	TTypeCheck
} from "../ValidationTypes";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class StringLiteralValidationResult implements IStringLiteralValidation {
  readonly passed: boolean;
  readonly typeCheck: TTypeCheck<string>;
  readonly valueAllowed: CriteriaValidation = CriteriaValidation.unchecked;

  readonly confirmedValue: string;

  constructor(value: any, readonly allowedValues: string[]) {
    const { passedBaseTest, typeCheck } = new PrimitiveValidator<string>(
      value,
      "string"
    );

    this.typeCheck = typeCheck;
    if (passedBaseTest) {
      this.confirmedValue = value as string;
      this.valueAllowed = this.checkValueAllowed();
      this.passed = this.valueAllowed === CriteriaValidation.passed;
    } else {
      this.passed = false;
    }
  }

  private checkValueAllowed(): CriteriaValidation {
    return CriteriaValidation.fromBool(
      this.allowedValues.includes(this.confirmedValue)
    );
  }
}
