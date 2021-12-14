import { AbsRTIType } from "./AbsRTIType";
import { TRTIValidation } from "./ValidationTypes";

export class RTINumber extends AbsRTIType {

    private readonly type = "RTINumber";    

    validate(value: any): TRTIValidation {

    	return {
    		type: this.type,
    		passed: typeof value === "number",
    		bigEnough: true,
    		notTooBig: true,
    		passedIntegerCheck: true
    	};

    }

}