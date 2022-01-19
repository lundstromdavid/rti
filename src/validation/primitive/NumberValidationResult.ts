import { RTINumberCriteria } from "../../classes/primitive/RTINumber";
import { RTIT } from "../../types/api-types";

import { isNull } from "../../utils/NullCheck";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class NumberValidationResult implements RTIT.INumberValidation {
  public readonly passed: boolean;
  public readonly discriminator = "number";
  public readonly typeCheck: RTIT.TypeCheck<number>;
  public readonly passedIntegerCheck: RTIT.CriteriaValidation;
  public readonly bigEnough: RTIT.CriteriaValidation;
  public readonly notTooBig: RTIT.CriteriaValidation;
  public readonly customValidationPassed: RTIT.CriteriaValidation;

  private confirmedValue: number;

  public constructor(value: any, private readonly rules: RTINumberCriteria) {
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
      (val) => val !== RTIT.CriteriaValidation.failed
    );
  }

  private checkInteger(): RTIT.CriteriaValidation {
    if (!this.rules.integer) return RTIT.CriteriaValidation.noRestriction;
    return RTIT.CriteriaValidation.fromBool(Number.isInteger(this.confirmedValue));
  }

  private checkBigEnough(): RTIT.CriteriaValidation {
    if (isNull(this.rules.minValue)) return RTIT.CriteriaValidation.noRestriction;
    return RTIT.CriteriaValidation.fromBool(this.confirmedValue >= this.rules.minValue);
  }

  private checkNotTooBig(): RTIT.CriteriaValidation {
    if (isNull(this.rules.maxValue)) return RTIT.CriteriaValidation.noRestriction;
    return RTIT.CriteriaValidation.fromBool(this.confirmedValue <= this.rules.maxValue);
  }
}
