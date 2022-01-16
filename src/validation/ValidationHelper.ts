import { MinHigherThanMax } from "../exceptions/MinHigherThanMax";
import { NegativeValueException } from "../exceptions/ZeroOrLowerException";
import { TPrimitive } from "../types/Primitive";
import assert from "../utils/Assert";
import { notNull } from "../utils/NullCheck";
import { BooleanValidationResult } from "./primitive/BooleanValidationResult";
import { NumberValidationResult } from "./primitive/NumberValidationResult";
import { NumericLiteralValidationResult } from "./primitive/NumericLiteralValidationResult";
import { StringLiteralValidationResult } from "./primitive/StringLiteralValidationResult";
import { StringValidationResult } from "./primitive/StringValidationResult";

export class ValidationHelper {
  static assertMinHigherThanMax(min: number, max: number) {
    const minNotNull = notNull(min);
    const maxNotNull = notNull(max);
    if (minNotNull && maxNotNull) {
      assert(min < max, new MinHigherThanMax());
    }
  }
  static assertNonNegative(...numbers: number[]) {
    numbers.forEach((number) => {
      if (notNull(number)) assert(number >= 0, new NegativeValueException());
    });
  }
}

export namespace ValidationHelper {
  export type Result<
    T extends TPrimitive,
    Literal extends boolean
  > = T extends string
    ? Literal extends true 
    ? StringLiteralValidationResult
    : StringValidationResult
    : T extends number
    ? Literal extends true
      ? NumericLiteralValidationResult
      : NumberValidationResult
    : T extends boolean
    ? BooleanValidationResult
    : never;
}
