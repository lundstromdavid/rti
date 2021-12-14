import { RTINumberValidation } from "../object-types/ValidationTypes";
import { AbsRTIType } from "./AbsRTIType";
import { TRTIValidation } from "./ValidationTypes";

export class RTINumber extends AbsRTIType<RTINumberValidation> {

    private readonly type = "RTINumber";    

    validate(value: any): RTINumberValidation {

    	return {
    		discriminator: this.type,
    		passed: typeof value === "number",
			correctType: true,
    		bigEnough: true,
    		notTooBig: true,
    		passedIntegerCheck: true
    	};

    }

}