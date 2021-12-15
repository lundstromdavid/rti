import { isNull } from "../utils/NullCheck";
import { RTIStringProps } from "./RTIString";
import {
  CorrectType,
  RTIStringValidation,
  RTIUnchecked,
  TRTIUnchecked,
} from "./ValidationTypes";

export class RTIStringValidationResult implements RTIStringValidation {
  readonly discriminator = "RTIString";
  readonly passed: boolean = false;
  readonly correctType: CorrectType<"string">;
  readonly longEnough: boolean | TRTIUnchecked = RTIUnchecked;
  readonly notTooLong: boolean | TRTIUnchecked = RTIUnchecked;
  readonly containsAllProvidedValues: boolean | TRTIUnchecked = RTIUnchecked;
  readonly containsAtLeastOneProvidedValue: boolean | TRTIUnchecked =
    RTIUnchecked;

  private confirmedValue: string;

  public constructor(
    private readonly value: object,
    private readonly args: RTIStringProps
  ) {
    this.correctType = this.checkCorrectType();
	if (this.correctType === true) {
		this.longEnough = this.checkLongEnough();
		this.notTooLong = this.checkNotTooLong();
		this.containsAllProvidedValues = this.checkContainsAll();
		this.containsAtLeastOneProvidedValue = this.checkContainsSome();
	}
  }

  private checkCorrectType(): CorrectType<"string"> {
    if (typeof this.value === "string") {
		this.confirmedValue = this.value as string;
		return true;
	}
    else
      return {
        expected: "string",
        actual: typeof this.value,
      };
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
	  const {containsAll} = this.args;
	  return isNull(containsAll) || containsAll.every(val => this.confirmedValue.includes(val));
  }
  private checkContainsSome(): boolean {
	const {containsSome} = this.args;
	return isNull(containsSome) || containsSome.some(val => this.confirmedValue.includes(val));
}
}
