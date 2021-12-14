import { RTIStringValidation, RTIUnchecked } from "../object-types/ValidationTypes";
import assert from "../utils/Assert";
import { MUtils } from "../utils/MUtils";
import { AbsRTIType } from "./AbsRTIType";
import { TRTIValidation } from "./ValidationTypes";

export class RTIString extends AbsRTIType<RTIStringValidation> {

    private readonly discriminator = "RTIString";
    private pMinLength?: number = undefined;
    private pMaxLength?: number = undefined;
    private pContains?: string[] = undefined;

    public minLength(min: number): RTIString {
    	this.pMinLength = min;
    	if (typeof this.pMaxLength === "number") {
    		assert(this.pMinLength < this.pMaxLength, 
    			"Creating an RTIString with a min length equal to or larger than the max length does not make sense");
    	}
    	return this;

    }

    public maxLength(max: number): RTIString {
    	this.pMaxLength = max;
    	if (typeof this.pMinLength === "number") {
    		assert(this.pMinLength < this.pMaxLength, 
    			"Creating an RTIString with a min length equal to or larger than the max length does not make sense");
    	}
    	return this;
    }

    public lengthInRange(min: number, max: number): RTIString {
    	return this.minLength(min).maxLength(max);
    }

    public contains(values: string | string[]): RTIString {
    	this.pContains = MUtils.asArray(values);
    	return this;
    }

	private default(passed: boolean, correctType: RTIStringValidation["correctType"]): RTIStringValidation {
		return {
			discriminator: this.discriminator,
			passed,
			correctType,
			longEnough: RTIUnchecked,
			notTooLong: RTIUnchecked,
			containsAllProvidedValues: RTIUnchecked
		};
	}

	private merge(passed: boolean, correctType: RTIStringValidation["correctType"], partial: Partial<RTIStringValidation> = {}): RTIStringValidation {
		return Object.assign(this.default(passed, correctType), partial);		
	}

	private mergeSuccess(partial: Partial<RTIStringValidation>) {
		return Object.assign(this.default(true, true), partial);
	}

	private longEnough(str: string): boolean {
		return this.pMinLength === undefined || str.length >= this.pMinLength;
	}

	private notTooLong(str: string): boolean {
		return this.pMaxLength === undefined || str.length <= this.pMaxLength;
	}

    public validate(value: any): RTIStringValidation {
		
		if (typeof value !== "string") {
			return this.merge(false, {
				expected: "string",
				actual: typeof value
			});
		} else {
			
			const partial: Partial<RTIStringValidation> = {
				longEnough: this.longEnough(value),
				notTooLong: this.notTooLong(value),
			};
			const len = value.length;
			partial.longEnough =  

			return {
				discriminator: this.discriminator,
				passed: true,
				correctType: true,
				longEnough: true,
				notTooLong: true,
				containsAllProvidedValues: true
			};


		}
		

    	
    }




}