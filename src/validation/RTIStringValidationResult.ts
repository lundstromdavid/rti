import { RTIStringProps } from "../object-types/RTIString";
import {
  TRTIUnchecked, TSingleValidation, TStringValidation, TTypeConfirmation
} from "../object-types/ValidationTypes";
import { isNull } from "../utils/NullCheck";
import { PrimitiveValidator } from "./AbsRTIPrimitiveValidation";

export class RTIStringValidationResult implements TStringValidation
{
  
  public readonly passed: boolean;
  public readonly discriminator: "string";
  public readonly correctType: TTypeConfirmation<string>;
  public readonly customValidationPassed: TSingleValidation;
  public readonly longEnough: TSingleValidation;
  public readonly notTooLong: TSingleValidation;
  public readonly containsAllProvidedValues: TSingleValidation;
  public readonly containsAtLeastOneProvidedValue: TSingleValidation;

  private confirmedValue: string;

  public constructor(
    private readonly value: any,
    private readonly args: RTIStringProps
  ) {
    const {passed: basePassed, customValidationPassed, typeConfirmation} = new PrimitiveValidator<string>(value, "string", args.customValidation);

    this.correctType = typeConfirmation;
    if (!basePassed) {
      this.passed = false;
    } else {
      this.confirmedValue = value as string;
      this.customValidationPassed = customValidationPassed;
      this.longEnough = this.checkLongEnough();
      this.notTooLong = this.checkNotTooLong();
      this.containsAllProvidedValues = this.checkContainsAll();
      this.containsAtLeastOneProvidedValue = this.checkContainsSome();
      this.passed = this.checkPassed();
    }

    
  }

  private checkPassed(): boolean {
    return [
      this.customValidationPassed,
      this.longEnough,
      this.notTooLong,
      this.containsAllProvidedValues,
      this.containsAtLeastOneProvidedValue,
    ].every((val) => val !== false);
  }



  private checkLongEnough(): boolean {
    const { minLength } = this.args;
    return isNull(minLength) || this.confirmedValue.length >= minLength;
  }
  private checkNotTooLong(): boolean {
    const { maxLength } = this.args;
    return isNull(maxLength) || this.confirmedValue.length <= maxLength;
  }
  private checkContainsAll(): boolean {
    const { includesAllCaseSensitive } = this.args;
    return (
      isNull(includesAllCaseSensitive) ||
      includesAllCaseSensitive.every((val) => this.confirmedValue.includes(val))
    );
  }
  private checkContainsSome(): boolean {
    const { includesSomeCaseSensitive } = this.args;
    return (
      isNull(includesSomeCaseSensitive) ||
      includesSomeCaseSensitive.some((val) => this.confirmedValue.includes(val))
    );
  }
}
