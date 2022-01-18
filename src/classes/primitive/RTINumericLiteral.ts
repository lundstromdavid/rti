import { NumericLiteralValidationResult } from "../../validation/primitive/NumericLiteralValidationResult";
import { RTIClass } from "../RTIClass";


export class RTINumericLiteral<Optional extends boolean, T extends number> extends RTIClass<NumericLiteralValidationResult, Optional> {

	private readonly discriminator = "numericLiteral";
	private readonly allowedValues: T[];

	constructor(private readonly optional: Optional, ...allowedValues: T[]) {
		super();
		this.allowedValues = allowedValues;
		
		this.confirmOnlyNumbers();
		this.confirmNoDuplicates();
	}

	static required<T extends number>(...allowedValues: T[]) {
		return new RTINumericLiteral<false, T>(false, ...allowedValues);
	  }
	
	  static optional<T extends number>(...allowedValues: T[]) {
		return new RTINumericLiteral<true, T>(true, ...allowedValues);
	  }
	
	  isOptional() {
		return this.optional;
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