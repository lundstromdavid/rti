import { AllowedInUnion } from "../classes/RTIUnion";
import { RTIT } from "../types/api-types";

export class UnionValidationResult<T extends AllowedInUnion> implements RTIT.IUnionValidation {

	readonly discriminator = "unionValidationResult";
	readonly passed: boolean;

	constructor(value: any, readonly unionValues: T[]) {
		this.passed = unionValues.some(obj => obj.validate(value).passed);
	}

}