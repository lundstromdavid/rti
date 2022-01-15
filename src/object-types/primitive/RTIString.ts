import { RTI } from "../../RTI";
import { MUtils } from "../../utils/MUtils";
import { TCustomValidationCallback } from "../../validation/primitive/PrimitiveValidator";
import { StringValidationResult } from "../../validation/primitive/StringValidationResult";
import { ValidationHelper } from "../../validation/ValidationHelper";
import { AbsRTIObject } from "../AbsRTIObject";

export type RTIStringProps = {
  minLength?: number;
  maxLength?: number;
  includesAllCaseSensitive?: string[];
  includesAllCaseInsensitive?: string[];
  includesSomeCaseSensitive?: string[];
  includesSomeCaseInsensitive?: string[];
  customValidation?: TCustomValidationCallback<string>;
};

export class RTIString extends AbsRTIObject<string> {
  private readonly discriminator = "RTIString";
  private readonly props: RTIStringProps = {};



  public min(min: number) {
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
    const {minLength, maxLength} = this.props;
    ValidationHelper.assertNonNegative(minLength, maxLength);
    ValidationHelper.assertMinHigherThanMax(minLength, maxLength);
    
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

  public validate(value: any): StringValidationResult {
    return new StringValidationResult(value, this.props);
  }
}