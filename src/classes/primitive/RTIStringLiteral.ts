import { StringLiteralValidationResult } from "../../validation/primitive/StringLiteralValidationResult";
import { RTIClass } from "../RTIClass";

export class RTIStringLiteral<Optional extends boolean, T extends string> extends RTIClass<StringLiteralValidationResult, Optional> {

	private readonly discriminator = "stringLiteral";
	private readonly allowedValues: T[];

	constructor(private readonly optional: Optional, ...allowedValues: T[]) {
		super();
		this.allowedValues = allowedValues;
		this.confirmOnlyString();
		this.confirmNoDuplicates();
	}

	static required<T extends string>(...allowedValues: T[]) {
		return new RTIStringLiteral<false, T>(false, ...allowedValues);
	  }
	
	  static optional<T extends string>(...allowedValues: T[]) {
		return new RTIStringLiteral<true, T>(true, ...allowedValues);
	  }
	
	  isOptional() {
		return this.optional;
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