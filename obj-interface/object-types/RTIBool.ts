import { AbsRTIType } from "./AbsRTIType";
import { TRTIValidation } from "./ValidationTypes";

export class RTIBool extends AbsRTIType {

    private readonly type = "RTIBoolean";

    validate(value: any): TRTIValidation {
    	return {
    		type: this.type,
    		passed: typeof value === "boolean"
    	};
    }
}