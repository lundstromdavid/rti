import { isNull } from "../utils/NullCheck";
import { RTIStringProps } from "../object-types/RTIString";
import {
  TypeConfirmation,
  RTIStringValidation,
  RTIUnchecked,
  TRTIUnchecked,
} from "../object-types/ValidationTypes";
import { AbsRTIPrimitiveValidation } from "./AbsRTIPrimitiveValidation";

export class RTIStringValidationResult extends AbsRTIPrimitiveValidation<string> {
  protected readonly validation: Omit<
    RTIStringValidation,
    "passed" | "correctType"
  > = {
    discriminator: "string",
    longEnough: RTIUnchecked,
    notTooLong: RTIUnchecked,
    containsAllProvidedValues: RTIUnchecked,
    containsAtLeastOneProvidedValue: RTIUnchecked,
  };

  private confirmedValue: string;

  public constructor(
    private readonly value: object,
    private readonly args: RTIStringProps
  ) {
    super(value);
  }

  validateType(object: any): TypeConfirmation<string> {
    if (typeof object === "string") return true;
    else
      return {
        expected: "string",
        actual: typeof object,
      };
  }

  performChecks() {
    this.validation.longEnough = this.checkLongEnough();
    this.validation.notTooLong = this.checkNotTooLong();
    this.validation.containsAllProvidedValues = this.checkContainsAll();
    this.validation.containsAtLeastOneProvidedValue = this.checkContainsSome();
    return [
      this.validation.longEnough,
      this.validation.notTooLong,
      this.validation.containsAllProvidedValues,
      this.validation.containsAtLeastOneProvidedValue,
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
