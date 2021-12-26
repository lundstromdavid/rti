import { RTIString } from "./RTIString";

export class RTIOptionalString extends RTIString {

	private readonly optionalClassDiscrimnator = "optional";

	isOptional() {
		return true;
	}

}