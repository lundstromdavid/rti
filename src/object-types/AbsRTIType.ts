import { TRTIValidation } from "./ValidationTypes";

export abstract class AbsRTIType<T extends TRTIValidation> {
    
    private pOptional = false;
    
    abstract validate(value: any): T;

    optional(): this {
    	this.pOptional = true;
    	return this;
    }

    isOptional() {
    	return this.pOptional;
    }
    
}