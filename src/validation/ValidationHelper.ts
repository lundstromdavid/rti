import { MinHigherThanMax } from "../exceptions/MinHigherThanMax";
import { NegativeValueException } from "../exceptions/NegativeValueException";
import { TPrimitive } from "../types/local-types";
import assert from "../utils/Assert";
import { notNull } from "../utils/NullCheck";
import { BooleanValidationResult } from "./primitive/BooleanValidationResult";
import { NumberValidationResult } from "./primitive/NumberValidationResult";
import { NumericLiteralValidationResult } from "./primitive/NumericLiteralValidationResult";
import { StringLiteralValidationResult } from "./primitive/StringLiteralValidationResult";
import { StringValidationResult } from "./primitive/StringValidationResult";
import { UnionValidationResult } from "./UnionValidationResult";

export class ValidationHelper {
  static assertMinHigherThanMax(min?: number, max?: number) {
    const minNotNull = notNull(min);
    const maxNotNull = notNull(max);
    if (minNotNull && maxNotNull) {
      assert(min < max, new MinHigherThanMax());
    }
  }
  static assertNonNegative(...numbers: (number | undefined | null)[]) {
    numbers.forEach((number) => {
      if (notNull(number)) assert(number >= 0, new NegativeValueException());
    });
  }
}

export namespace ValidationTypes {
  export type All =
    | StringValidationResult
    | StringLiteralValidationResult
    | NumberValidationResult
    | NumericLiteralValidationResult
    | BooleanValidationResult
    | UnionValidationResult<any>;

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

  /*   export type ToResult<T extends RTIObject<any>> = T extends RTIString
    ? StringValidationResult
    : //
    T extends RTIStringLiteral<any>
    ? StringLiteralValidationResult
    : //
    T extends RTINumber
    ? NumberValidationResult
    : //
    T extends RTINumericLiteral<any>
    ? NumericLiteralValidationResult
    : //
    T extends RTIBool
    ? BooleanValidationResult
    : //
    T extends RTIUnion<infer Objects>
    ? ToResult<Objects>
    : never;

  export type ToType<T extends RTIObject> = T extends RTIString
    ? string
    : //
    T extends RTIStringLiteral<infer Values>
    ? Values
    : //
    T extends RTINumber
    ? number
    : //
    T extends RTINumericLiteral<infer Numbers>
    ? Numbers
    : //
    T extends RTIBool
    ? boolean
    : //
    T extends RTIUnion<infer Objects>
    ? ToType<Objects>
    : never; */
}
