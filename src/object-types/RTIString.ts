import { RTIStringValidation } from "../object-types/ValidationTypes";
import assert from "../utils/Assert";
import { MUtils } from "../utils/MUtils";
import { notNull } from "../utils/NullCheck";
import { AbsRTIType } from "./AbsRTIType";
import { RTIStringValidationResult } from "./RTIStringValidationResult";

export type RTIStringProps = {
  minLength?: number;
  maxLength?: number;
  containsAll?: string[];
  containsSome?: string[];
};

export class RTIString extends AbsRTIType<RTIStringValidation> {
  private readonly discriminator = "RTIString";
  private readonly props: RTIStringProps = {};

  public minLength(min: number): RTIString {
    this.props.minLength = min;
    this.assertMinLenghtLowerThanMax();
    return this;
  }

  public maxLength(max: number): RTIString {
    this.props.maxLength = max;
    this.assertMinLenghtLowerThanMax();
    return this;
  }

  private assertMinLenghtLowerThanMax() {
    const { minLength, maxLength } = this.props;
    if (notNull(minLength) && notNull(maxLength)) {
      assert(
        minLength < maxLength,
        "Creating an RTIString with a min length equal to or larger than the max length does not make sense"
      );
    }
  }

  public lengthInRange(min: number, max: number): RTIString {
    return this.minLength(min).maxLength(max);
  }

  public containsAll(values: string | string[]): RTIString {
    this.props.containsAll = MUtils.asArray(values);
    return this;
  }

  public containsSome(values: string | string[]): RTIString {
    this.props.containsSome = MUtils.asArray(values);
    return this;
  }

  public validate(value: any): RTIStringValidation {
    return new RTIStringValidationResult(value, this.props);
  }
}
