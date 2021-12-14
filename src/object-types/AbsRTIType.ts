import { TRTIValidation } from "./ValidationTypes";

export abstract class AbsRTIType<T extends TRTIValidation> {
    
    private _optional = false;
    
    abstract validate(value: any): T;

    optional(): this {
    	this._optional = true;
    	return this;
    }

    isOptional() {
    	return this._optional;
    }
    
}