import { RTIBool } from "../primitive/RTIBool";
import { IOptional } from "./IOptional";

export class RTIOptionalBool extends RTIBool implements IOptional {

	readonly optionalDiscriminator = "optionalDiscriminator";

	isOptional(): true {
		return true;
	}

}

