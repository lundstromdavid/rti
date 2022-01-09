import { TNumberValidation, TTypeConfirmation } from "../object-types/ValidationTypes";

export class RTINumberValidationResult implements TNumberValidation {

	public readonly discriminator = "number";
	public readonly correctType: TTypeConfirmation<number>;
	public readonly passed: boolean;
	public readonly passedIntegerCheck: boolean;
	public readonly bigEnough: boolean;
	public readonly notTooBig: boolean;
	public readonly customValidationPassed: boolean;


}