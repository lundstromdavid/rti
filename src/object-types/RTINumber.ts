import { AbsRTIType } from "./AbsRTIType";
import { TNumberValidation } from "./ValidationTypes";

export class RTINumber extends AbsRTIType<number> {

    private readonly type = "number";    

    validate(value: any): TNumberValidation {

    	return {
    		discriminator: this.type,
			customValidationPassed: false,
    		passed: typeof value === "number",
			correctType: true,
    		bigEnough: true,
    		notTooBig: true,
    		passedIntegerCheck: true
    	};

    }

}