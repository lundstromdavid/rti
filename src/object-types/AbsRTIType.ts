import { TRTIValidation } from "./ValidationTypes";

export abstract class AbsRTIType {
    
    private _optional = false;
    
    abstract validate(value: any): TRTIValidation;

    optional(): this {
    	this._optional = true;
    	return this;
    }

    isOptional() {
    	return this._optional;
    }
    
}