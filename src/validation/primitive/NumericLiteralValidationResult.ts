import { RTIT } from "../../types/api-types";
import { PrimitiveValidator } from "./PrimitiveValidator";


export class NumericLiteralValidationResult implements RTIT.INumericLiteralValidation {

	readonly passed: boolean;
	readonly typeCheck: RTIT.TypeCheck<number>;
	readonly valueAllowed:  RTIT.CriteriaValidation = RTIT.CriteriaValidation.unchecked;

	readonly confirmedValue: number;

	constructor(value: any, readonly allowedValues: number[]) {

		const { passedBaseTest, typeCheck } = new PrimitiveValidator<number>(value, "number");

		this.typeCheck = typeCheck;
		if (passedBaseTest) {
			this.confirmedValue = value as number;
			this.valueAllowed = this.checkValueAllowed();
			this.passed = this.valueAllowed === RTIT.CriteriaValidation.passed;
		} else {
			this.passed = false;
		}

	}

	private checkValueAllowed(): RTIT.CriteriaValidation {
		return RTIT.CriteriaValidation.fromBool(this.allowedValues.includes(this.confirmedValue));
	}
} 
