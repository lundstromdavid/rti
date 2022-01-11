import { RTIString } from "./RTIString";

export class RTIOptionalString extends RTIString {

	private readonly optionalClassDiscrimnator = "optionals";

	isOptional() {
		return true;
	}

}