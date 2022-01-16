import { RTIStringProps } from "../../classes/primitive/RTIString";
import {
  CriteriaValidation,
  IStringValidation,
  TTypeCheck,
} from "../ValidationTypes";
import { RTI } from "../../RTI";
import { isNull } from "../../utils/NullCheck";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class StringValidationResult implements IStringValidation {
  public readonly passed: boolean;
  public readonly discriminator: "string";
  public readonly typeCheck: TTypeCheck<string>;
  public readonly customValidationPassed: CriteriaValidation;
  public readonly longEnough: CriteriaValidation;
  public readonly notTooLong: CriteriaValidation;
  public readonly containsAllProvidedValues: CriteriaValidation;
  public readonly containsAtLeastOneProvidedValue: CriteriaValidation;

  private confirmedValue: string;

  public constructor(value: any, private readonly args: RTIStringProps) {
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
    ].every((val) => val !== CriteriaValidation.failed);
  }

  private checkLongEnough(): CriteriaValidation {
    const { minLength } = this.args;
    if (isNull(minLength)) return CriteriaValidation.noRestriction;
    return CriteriaValidation.fromBool(this.confirmedValue.length >= minLength);
  }
  private checkNotTooLong(): CriteriaValidation {
    const { maxLength } = this.args;
    if (isNull(maxLength)) return CriteriaValidation.noRestriction;
    return CriteriaValidation.fromBool(this.confirmedValue.length <= maxLength);
  }
  private checkContainsAll(): CriteriaValidation {
    const { includesAllCaseSensitive, includesAllCaseInsensitive } = this.args;
    return CriteriaValidation.fromBool(
      this.checkContains(
        includesAllCaseSensitive,
        RTI.Case.sensitive,
        "every"
      ) &&
        this.checkContains(
          includesAllCaseInsensitive,
          RTI.Case.insensitive,
          "every"
        )
    );
  }

  private checkContainsSome(): CriteriaValidation {
    const { includesSomeCaseSensitive, includesSomeCaseInsensitive } =
      this.args;
    return CriteriaValidation.fromBool(
      this.checkContains(
        includesSomeCaseSensitive,
        RTI.Case.sensitive,
        "some"
      ) &&
        this.checkContains(
          includesSomeCaseInsensitive,
          RTI.Case.insensitive,
          "some"
        )
    );
  }

  private transform = (val: string, mode: RTI.Case) =>
    mode === RTI.Case.sensitive ? val : val.toUpperCase();

  private checkContains(
    arr: string[],
    mode: RTI.Case,
    functionType: "every" | "some"
  ): boolean {
    const val = this.transform(this.confirmedValue, mode);
    return (
      isNull(arr) ||
      arr[functionType]((el) => val.includes(this.transform(el, mode)))
    );
  }
}
