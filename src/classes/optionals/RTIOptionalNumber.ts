import { RTINumber } from "../primitive/RTINumber";
import { IOptional } from "./IOptional";

export class RTIOptionalNumber extends RTINumber implements IOptional {

	readonly optionalDiscriminator = "optionalDiscriminator";
	
	isOptional(): true {
		return true;
	}
}