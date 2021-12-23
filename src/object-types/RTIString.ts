import { MinHigherThanMax } from "../exceptions/MinHigherThanMax";
import { ZeroOrLowerValueException } from "../exceptions/ZeroOrLowerException";
import { RTIStringValidation } from "../object-types/ValidationTypes";
import { RTICase } from "../types/RTICase";
import assert from "../utils/Assert";
import { MUtils } from "../utils/MUtils";
import { notNull } from "../utils/NullCheck";
import { AbsRTIType } from "./AbsRTIType";
import { RTIStringValidationResult } from "../validation/RTIStringValidationResult";

export type RTIStringProps = {
  minLength?: number;
  maxLength?: number;
  includesAllCaseSensitive?: string[];
  includesAllCaseInsensitive?: string[];
  includesSomeCaseSensitive?: string[];
  includesSomeCaseInsensitive?: string[];
};

export class RTIString extends AbsRTIType<RTIStringValidation> {
  private readonly discriminator = "RTIString";
  private readonly props: RTIStringProps = {};

  public minLength(min: number): RTIString {
    this.props.minLength = min;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public maxLength(max: number): RTIString {
    this.props.maxLength = max;
    this.assertValidMinAndMaxLength();

    return this;
  }

  public lengthInRange(min: number, max: number): RTIString {
    this.minLength(min).maxLength(max);

    return this;
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
    mode: RTICase = RTICase.sensitive
  ): RTIString {
    switch (mode) {
      case RTICase.sensitive:
        this.props.includesAllCaseSensitive = MUtils.asArray(values);
        break;
      case RTICase.insensitive:
        this.props.includesAllCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  public includesSome(
    values: string | string[],
    mode: RTICase = RTICase.sensitive
  ): RTIString {
    switch (mode) {
      case RTICase.sensitive:
        this.props.includesSomeCaseSensitive = MUtils.asArray(values);
        break;
      case RTICase.insensitive:
        this.props.includesSomeCaseInsensitive = MUtils.asArray(values);
        break;
    }
    return this;
  }

  public validate(value: any): RTIStringValidation {
    return new RTIStringValidationResult(value, this.props);
  }
}
