import { TPrimitive } from "../types/Primitive";
import { RTIValidation } from "../validation/RTIValidation";
import { TRTIValidation } from "./ValidationTypes";

export abstract class AbsRTIType<T extends TPrimitive> {
    abstract validate(value: any): RTIValidation.Result<T>;

    isOptional() {
    	return false;
    }
    
}