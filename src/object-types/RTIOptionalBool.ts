import { RTIBool } from "./RTIBool";

export class RTIOptionalBool extends RTIBool {

	private readonly optionalClassDiscrimnator = "optionalBoolean";

	isOptional() {
		return true;
	}

}