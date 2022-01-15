import { RTINumberRules } from "../../object-types/primitive/RTINumber";
import {
  CriteriaValidation,
  INumberValidation,
  TTypeCheck
} from "../ValidationTypes";
import { isNull } from "../../utils/NullCheck";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class NumberValidationResult implements INumberValidation {
  public readonly passed: boolean;
  public readonly discriminator = "number";
  public readonly typeCheck: TTypeCheck<number>;
  public readonly passedIntegerCheck: CriteriaValidation;
  public readonly bigEnough: CriteriaValidation;
  public readonly notTooBig: CriteriaValidation;
  public readonly customValidationPassed: CriteriaValidation;

  private confirmedValue: number;

  public constructor(value: any, private readonly rules: RTINumberRules) {
    const {
      passedBaseTest,
      customValidationPassed,
      typeCheck,
    } = new PrimitiveValidator<number>(value, "number", rules.customValidation);

    //console.log({passedBaseTest, customValidationPassed, typeCheck, value, props: rules});

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
      (val) => val !== CriteriaValidation.failed
    );
  }

  private checkInteger(): CriteriaValidation {
    if (!this.rules.integer) return CriteriaValidation.noRestriction;
    return CriteriaValidation.fromBool(Number.isInteger(this.confirmedValue));
  }

  private checkBigEnough(): CriteriaValidation {
    if (isNull(this.rules.minValue)) return CriteriaValidation.noRestriction;
    return CriteriaValidation.fromBool(this.confirmedValue >= this.rules.minValue);
  }

  private checkNotTooBig(): CriteriaValidation {
    if (isNull(this.rules.maxValue)) return CriteriaValidation.noRestriction;
    return CriteriaValidation.fromBool(this.confirmedValue <= this.rules.maxValue);
  }
}
