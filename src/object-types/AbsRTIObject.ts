import { TPrimitive } from "../types/Primitive";
import { ValidationHelper } from "../validation/ValidationHelper";

export abstract class AbsRTIObject<T extends TPrimitive, Literal extends boolean = false> {
    abstract validate(value: any): ValidationHelper.Result<T, Literal>;

    isOptional() {
    	return false;
    }
    
}