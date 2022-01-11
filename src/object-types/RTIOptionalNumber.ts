import { RTINumber } from "./RTINumber";

export class RTIOptionalNumber extends RTINumber {

	private readonly optionalClassDiscrimnator = "optionalNumber";
	
	isOptional() {
		return true;
	}
}