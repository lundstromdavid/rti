import { MinHigherThanMax } from "../exceptions/MinHigherThanMax";
import { NegativeValueException } from "../exceptions/ZeroOrLowerException";
import { TPrimitive } from "../types/Primitive";
import assert from "../utils/Assert";
import { notNull } from "../utils/NullCheck";
import { RTINumberValidationResult } from "./RTINumberValidationResult";
import { RTIStringValidationResult } from "./RTIStringValidationResult";

export class RTIValidation {
  static assertMinHigherThanMax(min: number, max: number) {
    const minNotNull = notNull(min);
    const maxNotNull = notNull(max);
    if (minNotNull && maxNotNull) {
      assert(min < max, new MinHigherThanMax());
    }
  }
  static assertNonNegative(...numbers: number[]) {
    numbers.forEach(number => {
      if (notNull(number)) assert(number >= 0, new NegativeValueException());
    })
  }
}

export namespace RTIValidation {
  export type Result<T extends TPrimitive> = T extends string
    ? RTIStringValidationResult
    : T extends number
    ? RTINumberValidationResult
    : never;
}
