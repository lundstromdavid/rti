import { ValidationTypes } from "../validation/ValidationHelper";


export abstract class RTIClass<T extends ValidationTypes.All>   {
	private readonly rtiObjDiscriminator = "rtiObj"; 

	abstract validate(value: any): T;

    isOptional() {
    	return false;
    }
}