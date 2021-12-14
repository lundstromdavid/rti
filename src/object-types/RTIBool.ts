import { RTIBooleanValidation } from "../object-types/ValidationTypes";
import { AbsRTIType } from "./AbsRTIType";
import { TRTIValidation } from "./ValidationTypes";

export class RTIBool extends AbsRTIType<RTIBooleanValidation> {

    private readonly type = "RTIBoolean";

    validate(value: any): RTIBooleanValidation {
    	return {
    		discriminator: this.type,
			correctType: true,
    		passed: typeof value === "boolean"
    	};
    }
}