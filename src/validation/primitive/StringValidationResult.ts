import { RTIStringCriteria } from "../../classes/primitive/RTIString";

import { RTI } from "../../RTI";
import { RTIT } from "../../types/api-types";
import { isNull } from "../../utils/NullCheck";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class StringValidationResult implements RTIT.IStringValidation {
  public readonly passed: boolean;
  public readonly discriminator: "string";
  public readonly typeCheck: RTIT.TypeCheck<string>;
  public readonly customValidationPassed: RTIT.CriteriaValidation;
  public readonly longEnough: RTIT.CriteriaValidation;
  public readonly notTooLong: RTIT.CriteriaValidation;
  public readonly containsAllProvidedValues: RTIT.CriteriaValidation;
  public readonly containsAtLeastOneProvidedValue: RTIT.CriteriaValidation;

  private confirmedValue: string;

  public constructor(value: any, private readonly args: RTIStringCriteria) {
    const { passedBaseTest, customValidationPassed, typeCheck } =
      new PrimitiveValidator<string>(value, "string", args.customValidation);

    this.customValidationPassed = customValidationPassed;
    this.typeCheck = typeCheck;
    if (!passedBaseTest) {
      this.passed = false;
    } else {
      this.confirmedValue = value as string;
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
    ].every((val) => val !== RTIT.CriteriaValidation.failed);
  }

  private checkLongEnough(): RTIT.CriteriaValidation {
    const { minLength } = this.args;
    if (isNull(minLength)) return RTIT.CriteriaValidation.noRestriction;
    return RTIT.CriteriaValidation.fromBool(this.confirmedValue.length >= minLength);
  }
  private checkNotTooLong(): RTIT.CriteriaValidation {
    const { maxLength } = this.args;
    if (isNull(maxLength)) return RTIT.CriteriaValidation.noRestriction;
    return RTIT.CriteriaValidation.fromBool(this.confirmedValue.length <= maxLength);
  }
  private checkContainsAll(): RTIT.CriteriaValidation {
    const { includesAllCaseSensitive, includesAllCaseInsensitive } = this.args;
    return RTIT.CriteriaValidation.fromBool(
      this.checkContains(
        includesAllCaseSensitive,
        RTIT.Case.sensitive,
        "every"
      ) &&
        this.checkContains(
          includesAllCaseInsensitive,
          RTIT.Case.insensitive,
          "every"
        )
    );
  }

  private checkContainsSome(): RTIT.CriteriaValidation {
    const { includesSomeCaseSensitive, includesSomeCaseInsensitive } =
      this.args;
    return RTIT.CriteriaValidation.fromBool(
      this.checkContains(
        includesSomeCaseSensitive,
        RTIT.Case.sensitive,
        "some"
      ) &&
        this.checkContains(
          includesSomeCaseInsensitive,
          RTIT.Case.insensitive,
          "some"
        )
    );
  }

  private transform = (val: string, mode: RTIT.Case) =>
    mode === RTIT.Case.sensitive ? val : val.toUpperCase();

  private checkContains(
    arr: string[],
    mode: RTIT.Case,
    functionType: "every" | "some"
  ): boolean {
    const val = this.transform(this.confirmedValue, mode);
    return (
      isNull(arr) ||
      arr[functionType]((el) => val.includes(this.transform(el, mode)))
    );
  }
}
