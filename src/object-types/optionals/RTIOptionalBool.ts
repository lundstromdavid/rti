import { RTIBool } from "../primitive/RTIBool";

export class RTIOptionalBool extends RTIBool {

	private readonly optionalClassDiscrimnator = "optional";

	isOptional() {
		return true;
	}

}