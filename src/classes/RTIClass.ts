import { ValidationTypes } from "../validation/ValidationHelper";


export abstract class RTIClass<T extends ValidationTypes.All, Optional extends boolean = true>   {
	private readonly rtiObjDiscriminator = "rtiObj"; 

	abstract validate(value: any): T;
    abstract isOptional(): Optional;

}