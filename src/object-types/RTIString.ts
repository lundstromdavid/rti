import { TRTIValidation } from "../object-types/ValidationTypes";
import { RTI } from "../RTI";
import { MUtils } from "../utils/MUtils";
import { TCustomValidationCallback } from "../validation/PrimitiveValidator";
import { RTIStringValidationResult } from "../validation/RTIStringValidationResult";
import { RTIValidation } from "../validation/RTIValidation";
import { AbsRTIType } from "./AbsRTIType";

export type RTIStringProps = {
  minLength?: number;
  maxLength?: number;
  includesAllCaseSensitive?: string[];
  includesAllCaseInsensitive?: string[];
  includesSomeCaseSensitive?: string[];
  includesSomeCaseInsensitive?: string[];
  customValidation?: TCustomValidationCallback<string>;
};

export class RTIString extends AbsRTIType<string> {
  private readonly discriminator = "RTIString";
  private readonly props: RTIStringProps = {};



  public min(min: number): RTIString {
    this.props.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public max(max: number): RTIString {
    this.props.maxLength = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public range(min: number, max: number): RTIString {
    return this.min(min).max(max);
  }


  private assertValidMinAndMaxLength() {
    RTIValidation.assertMinHigherThanMax(this.props.minLength, this.props.maxLength);
  }

  public includesAll(
    values: string | string[],
    mode: RTI.Case = RTI.Case.sensitive
  ): RTIString {
    switch (mode) {
      case RTI.Case.sensitive:
        this.props.includesAllCaseSensitive = MUtils.asArray(values);
        break;
      case RTI.Case.insensitive:
        this.props.includesAllCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  public includesSome(
    values: string | string[],
    mode: RTI.Case = RTI.Case.sensitive
  ): RTIString {
    switch (mode) {
      case RTI.Case.sensitive:
        this.props.includesSomeCaseSensitive = MUtils.asArray(values);
        break;
      case RTI.Case.insensitive:
        this.props.includesSomeCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  public validate(value: any): RTIStringValidationResult {
    return new RTIStringValidationResult(value, this.props);
  }
}
