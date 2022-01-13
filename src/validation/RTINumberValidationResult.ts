import { RTINumberProps } from "../object-types/RTINumber";
import {
  TNumberValidation,
  TSingleValidation,
  TTypeCheck
} from "../object-types/ValidationTypes";
import { isNull } from "../utils/NullCheck";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class RTINumberValidationResult implements TNumberValidation {
  public readonly passed: boolean;
  public readonly discriminator = "number";
  public readonly typeCheck: TTypeCheck<number>;
  public readonly passedIntegerCheck: TSingleValidation;
  public readonly bigEnough: TSingleValidation;
  public readonly notTooBig: TSingleValidation;
  public readonly customValidationPassed: TSingleValidation;

  private confirmedValue: number;

  public constructor(value: any, private readonly props: RTINumberProps) {
    const {
      passedBaseTest,
      customValidationPassed,
      typeCheck,
    } = new PrimitiveValidator<number>(value, "number", props.customValidation);

    console.log({passedBaseTest, customValidationPassed, typeCheck, value, props});

    this.typeCheck = typeCheck;
    this.customValidationPassed = customValidationPassed;
    if (!passedBaseTest) {
      this.passed = false;
      
    } else {
      this.confirmedValue = value as number;
      this.passedIntegerCheck = this.checkInteger();
      this.bigEnough = this.checkBigEnough();
      this.notTooBig = this.checkNotTooBig();
      this.passed = this.checkPassed();
    }
  }

  private checkPassed(): boolean {
    return [this.customValidationPassed, this.passedIntegerCheck, this.bigEnough, this.notTooBig].every(
      (val) => val
    );
  }

  private checkInteger(): boolean {
    if (!this.props.integer) return true;
    return Number.isInteger(this.confirmedValue);
  }

  private checkBigEnough(): boolean {
    if (isNull(this.props.minValue)) return true;
    return this.confirmedValue >= this.props.minValue;
  }

  private checkNotTooBig(): boolean {
    if (isNull(this.props.maxValue)) return true;
    return this.confirmedValue <= this.props.maxValue;
  }
}
