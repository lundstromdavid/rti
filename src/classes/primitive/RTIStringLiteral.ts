import { StringLiteralValidationResult } from "../../validation/primitive/StringLiteralValidationResult";
import { RTIClass } from "../RTIClass";

export class RTIStringLiteral<T extends string> extends RTIClass<StringLiteralValidationResult> {

	private readonly discriminator = "stringLiteral";
	private readonly allowedValues: T[];

	constructor(...allowedValues: T[]) {
		super();
		this.allowedValues = allowedValues;
		this.confirmOnlyString();
		this.confirmNoDuplicates();
	}

	private confirmOnlyString() {
		if (this.allowedValues.some(num => typeof num !== "string")) {
			throw new Error("Non string values passed into the numerical literal constructor (This error/exception should be more specific later)");
		}
	}

	private confirmNoDuplicates() {
		if (this.allowedValues.some((str, index) => this.allowedValues.indexOf(str) !== index)) {
			throw new Error("Duplicate string values passed into the numerical literal constructor (This error/exception should be more specific later)")
		}
	}

	validate(value: any): StringLiteralValidationResult {
		return new StringLiteralValidationResult(value, this.allowedValues);
	}
  }