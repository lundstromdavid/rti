import { RTINumberProps } from "../object-types/RTINumber";
import {
  TNumberValidation,
  TSingleValidation,
  TTypeConfirmation,
} from "../object-types/ValidationTypes";
import { isNull } from "../utils/NullCheck";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class RTINumberValidationResult implements TNumberValidation {
  public readonly passed: boolean;
  public readonly discriminator = "number";
  public readonly correctType: TTypeConfirmation<number>;
  public readonly passedIntegerCheck: TSingleValidation;
  public readonly bigEnough: TSingleValidation;
  public readonly notTooBig: TSingleValidation;
  public readonly customValidationPassed: TSingleValidation;

  private confirmedValue: number;

  public constructor(value: any, private readonly args: RTINumberProps) {
    const {
      passed: basePassed,
      customValidationPassed,
      typeConfirmation,
    } = new PrimitiveValidator<number>(value, "number", args.customValidation);

    this.correctType = typeConfirmation;
    if (!basePassed) {
      this.passed = false;
    } else {
      this.confirmedValue = value as number;
      this.customValidationPassed = customValidationPassed;
      this.passedIntegerCheck = this.checkInteger();
      this.bigEnough = this.checkBigEnough();
      this.notTooBig = this.checkNotTooBig();
    }
  }

  private checkInteger(): boolean {
    if (!this.args.integer) return true;
    return Number.isInteger(this.confirmedValue);
  }

  private checkBigEnough(): boolean {
    if (isNull(this.args.minValue)) return true;
    return this.confirmedValue >= this.args.minValue;
  }

  private checkNotTooBig(): boolean {
    if (isNull(this.args.maxValue)) return true;
    return this.confirmedValue <= this.args.maxValue;
  }
}
