import { RTIRuntimeObject } from "./RTIRuntimeObjectBuilder";
import { ParsedInterfaceV2, RTI } from "./RTI";
import { RTIPrimitiveType, RTIType } from "./RTIType";
import { UUID } from "../utility/UUID";

export type TValidationErrors<T extends string> = {
  [key in keyof ParsedInterfaceV2<T>]?: {
    expectedType: string;
    actualType: string;
  };
}; // & { additionalKeys?: string[] };

export class MValidationError<T extends string> extends Error {
	constructor(readonly errors: TValidationErrors<T>) {
		super("Validation failed");

		Object.setPrototypeOf(this, MValidationError.prototype);
	}
}

// ToDo: Explain what they do
export interface RTIValidationOptions {
  disallowAdditionalProperties?: boolean;
  stopOnFirstError?: boolean;
}

export class RTIValidator<T extends string> {
	constructor(readonly runtimeObj: RTIRuntimeObject<T>) {}

	/*
    Makes sure that all the required properties are included, and that all optional properties
    are of the right type.

    The options are documented by the interface definition
  */
	validate(
		passedInObj: any,
		options: RTIValidationOptions = {}
	): Validated<ParsedInterfaceV2<T>> {
		if (typeof passedInObj !== "object") throw new MValidationError({});

		const { disallowAdditionalProperties, stopOnFirstError } = options;

		if (disallowAdditionalProperties)
			throw new Error(
				"disallowAdditionalProperties option not implemented yet"
			);

		const errors: TValidationErrors<T> = {};
		//errors.additionalKeys = [];

		const validatedObject: Partial<ParsedInterfaceV2<T>> = {};

		const runtimeEntries = Object.entries(this.runtimeObj);
		const length = runtimeEntries.length;

		for (let i = 0; i < length; i++) {
			const [uncastedKey, allowedValues] = runtimeEntries[i];

			const key = uncastedKey as keyof ParsedInterfaceV2<T>;
			const passedInValue = passedInObj[key];

			if (key in passedInObj) {
				const rightType = this.compareTypes(
					key ,
					passedInValue
				);

				if (!rightType) {
					errors[key] = {
						expectedType: this.getType(key),
						actualType: typeof passedInValue,
					};
					if (stopOnFirstError) break;
				} else {
					validatedObject[key] = passedInValue;
				}
			} else {
				// Why are not the generics infered??
				if (RTIType.isRequired<T, RTIRuntimeObject<T>>(this.runtimeObj, key)) {
					errors[key] = {
						expectedType: this.getType(key),
						actualType: typeof passedInValue,
					};
					if (stopOnFirstError) break;
				}
			}
		}

		if (Object.values(errors).length) throw new MValidationError(errors);

		return new Validated(validatedObject );
	}

	partiallyValidate(
		passedInObj: any,
		options: RTIValidationOptions = {}
	): PartiallyValidated<ParsedInterfaceV2<T>> {
		if (typeof passedInObj !== "object") throw new MValidationError({});

		const { disallowAdditionalProperties, stopOnFirstError } = options;

		if (disallowAdditionalProperties)
			throw new Error(
				"disallowAdditionalProperties option now implemented yet"
			);

		const errors: TValidationErrors<T> = {};
		const validatedObject: Partial<ParsedInterfaceV2<T>> = {};

		const passedInEntries = Object.entries(passedInObj);
		const length = passedInEntries.length;

		for (let i = 0; i < length; i++) {
			const [key, passedInValue] = passedInEntries[i];

			if (key in this.runtimeObj) {
				const castedKey = key as keyof ParsedInterfaceV2<T>;

				const rightType = this.compareTypes(castedKey, passedInValue);

				if (!rightType) {
					errors[castedKey] = {
						expectedType: this.getType(castedKey),
						actualType: typeof passedInValue,
					};
					if (stopOnFirstError) break;
				} else {
					validatedObject[castedKey] = passedInValue as any;
				}
			}
		}

		if (Object.values(errors).length) throw new MValidationError(errors);

		// Why does this need to be casted to any?!?!?!?!?!?!?
		return new PartiallyValidated(validatedObject as any);
	}

	private getType<K extends keyof ParsedInterfaceV2<T>>(runtimeObjectKey: K) {
		return this.runtimeObj[runtimeObjectKey]
			.map((obj) => obj.getType())
			.join(" | ");
	}

	private compareTypes<K extends keyof ParsedInterfaceV2<T>>(
		runtimeObjectKey: K,
		passedInValue: any
	) {
		if (passedInValue === undefined || passedInValue === null) {
			return RTIType.isOptional(this.runtimeObj, runtimeObjectKey);
		}

		const values = this.runtimeObj[runtimeObjectKey];

		return values.some((rtiValue) => {
			if (Array.isArray(passedInValue)) {
				if (!rtiValue.isArray()) return false;

				if (passedInValue.length === 0) return true;

				const singleValue = passedInValue[0];

				return typeof singleValue === rtiValue.getType();
			} else {

				if (rtiValue.getType() === "UUID") {

					return UUID.validate(passedInValue);

				}

				return rtiValue.getType() === typeof passedInValue;
			}
		});
	}
}

// Created when a full validation has passed in the validator
class Validated<T extends ParsedInterfaceV2<any>> {
	constructor(readonly obj: T) {}

	// Not good
	get noPassword(): Omit<T, "password"> {
		const omitted: Omit<T, "password"> = { ...this.obj };
		if ("password" in omitted) delete omitted["password"];

		return omitted;
	}

	get noUndefined(): Exclude<T, undefined> {
		const copy: { [key: string]: any } = { ...this.obj };
		Object.entries(copy).forEach(([key, value]) => {
			if (value == undefined) {
				delete copy[key];
			}
		});
		return copy as Exclude<T, undefined>;
	}
}

// Export the type so that a function can require a validated object
export type TValidated<T extends RTI<any>> = T extends RTI<infer U>
  ? Validated<ParsedInterfaceV2<U>>
  : never;

// Created when a partial valiadtion has passed in the validator
class PartiallyValidated<T extends Partial<ParsedInterfaceV2<any>>> {
	constructor(readonly obj: T) {}
}

// Export the type so that a function can require a partially validated object
export type TPartiallyValidated<T extends RTI<any>> = T extends RTI<infer U>
  ? PartiallyValidated<Partial<ParsedInterfaceV2<U>>>
  : never;
