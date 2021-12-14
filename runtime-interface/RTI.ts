import {
	RTIRuntimeObjectBuilder,
	RTIRuntimeObject,
} from "./RTIRuntimeObjectBuilder";
import { TInterfaceAllowedChars } from "./types/TInterfaceAllowedChars";
import { TInterfaceParserV2 } from "./types/TInterfaceParser";
import { RTIRestrictions } from "./types/TRTIRestrict";
import { SplitSpecial } from "./types/TSplit";
import {
	RTIValidator,
	RTIValidationOptions,
	TValidated,
	TPartiallyValidated,
} from "./RTIValidator";
import { StripNotInUnionForEach } from "./types/TStripNotInUnion";
import { UUID as UUIDClass } from "../utility/UUID";

export type ParsedInterfaceV2<T extends string> = TInterfaceParserV2<
  StripNotInUnionForEach<SplitSpecial<T, ";" | ",">, TInterfaceAllowedChars>
>;

export class RTI<T extends string> {
  readonly runtimeObj: RTIRuntimeObject<T>;

  private validator: RTIValidator<T>;

  constructor(str: T) {
  	const builder = new RTIRuntimeObjectBuilder(str);
  	this.runtimeObj = builder.build();

  	this.validator = new RTIValidator(this.runtimeObj);

  	//console.log(this.runtimeObj);
  }

  static parse<T extends string>(str: T): RTI<T> {
  	return new RTI(str);
  }

  validate(
  	passedInObj: any,
  	options: RTIValidationOptions = {}
  ): TValidated<this> {
  	return this.validator.validate(passedInObj, options) as TValidated<this>;
  }

  partiallyValidate(
  	passedInObj: any,
  	options: RTIValidationOptions = {}
  ): TPartiallyValidated<this> {
  	// Typescript wtf
  	return this.validator.partiallyValidate(
  		passedInObj,
  		options
  	) as unknown as TPartiallyValidated<this>;
  }

  restrict<K extends keyof ParsedInterfaceV2<T>>(
  	key: K
  ): RTIRestrictions<ParsedInterfaceV2<T>[K]> {
  	throw "not implemented";
  }
}

export namespace RTI {
  export type Interface<T extends RTI<any>> = T extends RTI<infer K>
    ? ParsedInterfaceV2<K>
    : never;

  export function UUID() {
  	return UUIDClass.generate().value;
  }
}
