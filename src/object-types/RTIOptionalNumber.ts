import { RTINumber } from "./RTINumber";

export class RTIOptionalNumber extends RTINumber {

	private readonly optionalClassDiscrimnator = "optional";
	
	isOptional() {
		return true;
	}
}