import { RTINumericLiteral } from "../primitive/RTINumericLiteral";
import { IOptional } from "./IOptional";

export class RTIOptionalNumericLiteral<T extends number> extends RTINumericLiteral<T> implements IOptional {

	readonly optionalDiscriminator = "optionalDiscriminator";

	isOptional(): true {
		return true;
	}


}