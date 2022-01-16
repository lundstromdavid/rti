import { RTIString } from "../primitive/RTIString";
import { IOptional } from "./IOptional";

export class RTIOptionalString extends RTIString implements IOptional {

	readonly optionalDiscriminator = "optionalDiscriminator";

	isOptional(): true {
		return true;
	}

}