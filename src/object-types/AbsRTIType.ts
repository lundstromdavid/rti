import { TPrimitive } from "../types/Primitive";
import { TRTIValidation } from "./ValidationTypes";

export abstract class AbsRTIType<T extends TPrimitive> {
    
    private pOptional = false;
    
    abstract validate(value: any): TRTIValidation<T>;

    optional(): this {
    	this.pOptional = true;
    	return this;
    }

    isOptional() {
    	return this.pOptional;
    }
    
}