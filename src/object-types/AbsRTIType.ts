import { TPrimitive } from "../types/Primitive";
import { TRTIValidation } from "./ValidationTypes";

export abstract class AbsRTIType<T extends TPrimitive> {
    abstract validate(value: any): TRTIValidation<T>;

    isOptional() {
    	return false;
    }
    
}