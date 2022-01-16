import { UnionValidationResult } from "../validation/UnionValidationResult";
import { ValidationTypes } from "../validation/ValidationHelper";
import { RTIClass } from "./RTIClass";

type AnyExceptUnion = Exclude<ValidationTypes.All, UnionValidationResult>;

export class RTIUnion<
  T extends RTIClass<AnyExceptUnion>
> extends RTIClass<UnionValidationResult> {

	readonly unionValues: T[];

	constructor(...unionValues: T[]) {
		super();
		this.unionValues = unionValues;
	}

	
  validate(value: any): UnionValidationResult {
    throw "";
  }
}
