import isUUID from "validator/lib/isUUID";

export class RTICustomTypeValidation {


	static uuid(value: string) {
		return isUUID(value);
	}

} 