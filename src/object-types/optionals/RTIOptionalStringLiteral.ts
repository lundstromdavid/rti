import { RTIStringLiteral } from "../primitive/RTIStringLiteral";
import { IOptional } from "./IOptional";

export class RTIOptionalStringLiteral<T extends string> extends RTIStringLiteral<T> implements IOptional {

	readonly optionalDiscriminator = "optionalDiscriminator";

	isOptional(): true {
		return true;
	}

}