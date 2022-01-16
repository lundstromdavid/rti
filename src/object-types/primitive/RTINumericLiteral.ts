import { NumericLiteralValidationResult } from "../../validation/primitive/NumericLiteralValidationResult";
import { AbsRTIObject } from "../AbsRTIObject";


export class RTINumericLiteral<T extends number> extends AbsRTIObject<number, true> {

	private readonly discriminator = "numericLiteral";
	private readonly allowedValues: T[];

	constructor(...allowedValues: T[]) {
		super();
		this.allowedValues = allowedValues;
		
		this.confirmOnlyNumbers();
		this.confirmNoDuplicates();
	}

	private confirmOnlyNumbers() {
		if (this.allowedValues.some(num => typeof num !== "number")) {
			throw new Error("Non numerical values passed into the numerical literal constructor (This error/exception should be more specific later)");
		}
	}

	private confirmNoDuplicates() {
		if (this.allowedValues.some((num, index) => this.allowedValues.indexOf(num) !== index)) {
			throw new Error("Duplicate numberical values passed into the numerical literal constructor (This error/exception should be more specific later)")
		}
	}

	validate(value: any): NumericLiteralValidationResult {
		return new NumericLiteralValidationResult(value, this.allowedValues);
	}
  }