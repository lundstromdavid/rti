import assert from "../utils/Assert";
import { MUtils } from "../utils/MUtils";
import { AbsRTIType } from "./AbsRTIType";
import { TRTIValidation } from "./ValidationTypes";

export class RTIString extends AbsRTIType {

    private readonly type = "RTIString";
    private _minLength?: number = undefined;
    private _maxLength?: number = undefined;
    private _contains?: string[] = undefined;


    public minLength(min: number): RTIString {
    	this._minLength = min;
    	if (typeof this._maxLength === "number") {
    		assert(this._minLength < this._maxLength, 
    			"Creating an RTIString with a min length equal to or larger than the max length does not make sense");
    	}
    	return this;

    }

    public maxLength(max: number): RTIString {
    	this._maxLength = max;
    	if (typeof this._minLength === "number") {
    		assert(this._minLength < this._maxLength, 
    			"Creating an RTIString with a min length equal to or larger than the max length does not make sense");
    	}
    	return this;
    }

    public lengthInRange(min: number, max: number): RTIString {
    	return this.minLength(min).maxLength(max);
    }

    public contains(values: string | string[]): RTIString {
    	this._contains = MUtils.asArray(values);
    	return this;
    }

    public validate(value: any): TRTIValidation {
    	return {
    		type: this.type,
    		passed: true,
    		longEnough: true,
    		notTooLong: true,
    		containsAllProvidedValues: true
    	};
    }




}