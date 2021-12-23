import {
  RTIBooleanValidation,
  RTINumberValidation,
  RTIStringValidation, TRTIUnchecked, TypeConfirmation
} from "../object-types/ValidationTypes";
import { TPrimitive } from "../types/Primitive";

type CustomValidationCallback<T extends TPrimitive> = (value: T) => boolean;

type PrimitiveToValidation<T extends TPrimitive> = T extends string
  ? RTIStringValidation
  : T extends number
  ? RTINumberValidation
  : RTIBooleanValidation;

export abstract class AbsRTIPrimitiveValidation<T extends TPrimitive> {
  protected readonly validatedType: T;
  private passed: boolean;
  private customValidationPassed: boolean | TRTIUnchecked = "unchecked";
  protected readonly typeConfirmation: TypeConfirmation<T>;
  protected readonly validation: Omit<
    PrimitiveToValidation<T>,
    "passed" | "correctType" | "customValidation"
  >;
  protected customValidationCallback: CustomValidationCallback<T>;

  constructor(protected readonly object: any) {
    this.typeConfirmation = this.validateType(object);
    if (this.typeConfirmation == true) {
      this.validatedType = object;
      this.customValidationPassed = this.customValidationCallback(this.validatedType);
      this.passed = this.performChecks();
    } else {
      this.passed = false;
    }
  }

  protected abstract validateType(object: any): TypeConfirmation<T>;
  protected abstract performChecks(): boolean;
  public get results(): PrimitiveToValidation<T> {
   const combined: PrimitiveToValidation<T> = {
      ...this.validation,
      passed: this.passed,
      correctType: this.typeConfirmation,
      customValidationPassed: this.customValidationPassed
    } as PrimitiveToValidation<T>; // Why is this cast needed? 

    return combined;
  }

  public custom(callback: CustomValidationCallback<T>) {
    this.customValidationCallback = callback;
  }
}
