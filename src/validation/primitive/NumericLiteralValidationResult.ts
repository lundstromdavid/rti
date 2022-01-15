import { CriteriaValidation, INumericLiteralValidation, TTypeCheck } from "../ValidationTypes";
import { PrimitiveValidator } from "./PrimitiveValidator";


export class NumericLiteralValidationResult implements INumericLiteralValidation {

	readonly passed: boolean;
	readonly typeCheck: TTypeCheck<number>;
	readonly valueAllowed:  CriteriaValidation = CriteriaValidation.unchecked;

	readonly confirmedValue: number;

	constructor(value: any, readonly allowedValues: number[]) {

		const { passedBaseTest, typeCheck } = new PrimitiveValidator<number>(value, "number");

		this.typeCheck = typeCheck;
		if (passedBaseTest) {
			this.confirmedValue = value as number;
			this.valueAllowed = this.checkValueAllowed();
			this.passed = this.valueAllowed === CriteriaValidation.passed;
		} else {
			this.passed = false;
		}

	}

	private checkValueAllowed(): CriteriaValidation {
		return CriteriaValidation.fromBool(this.allowedValues.includes(this.confirmedValue));
	}
} 
