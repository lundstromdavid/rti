import { MinHigherThanMax } from "../exceptions/MinHigherThanMax";
import { ZeroOrLowerValueException } from "../exceptions/ZeroOrLowerException";
import { TRTIValidation } from "../object-types/ValidationTypes";
import { RTI } from "../RTI";
import assert from "../utils/Assert";
import { MUtils } from "../utils/MUtils";
import { notNull } from "../utils/NullCheck";
import { TCustomValidationCallback } from "../validation/PrimitiveValidator";
import { RTIStringValidationResult } from "../validation/RTIStringValidationResult";
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
    return this.minLength(min);
  }

  public minLength(min: number): RTIString {
    this.props.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public max(max: number): RTIString {
    return this.maxLength(max);
  }

  public maxLength(max: number): RTIString {
    this.props.maxLength = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public range(min: number, max: number): RTIString {
    return this.lengthInRange(min, max);
  }

  public lengthInRange(min: number, max: number): RTIString {
    return this.min(min).max(max);
  }

  private assertValidMinAndMaxLength() {
    const { minLength, maxLength } = this.props;
    const minNotNull = notNull(minLength);
    const maxNotNull = notNull(maxLength);
    if (minNotNull) assert(minLength > 0, new ZeroOrLowerValueException());
    if (maxNotNull) assert(maxLength > 0, new ZeroOrLowerValueException());
    if (minNotNull && maxNotNull) {
      assert(minLength < maxLength, new MinHigherThanMax());
    }
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

  public validate(value: any): TRTIValidation<string> {
    return new RTIStringValidationResult(value, this.props);
  }
}
