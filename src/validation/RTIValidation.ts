import { MinHigherThanMax } from "../exceptions/MinHigherThanMax";
import { ZeroOrLowerValueException } from "../exceptions/ZeroOrLowerException";
import { TPrimitive } from "../types/Primitive";
import assert from "../utils/Assert";
import { notNull } from "../utils/NullCheck";
import { RTINumberValidationResult } from "./RTINumberValidationResult";
import { RTIStringValidationResult } from "./RTIStringValidationResult";

export class RTIValidation {
  static assertMinHigherThanMax(min: number, max: number) {
    const minNotNull = notNull(min);
    const maxNotNull = notNull(max);
    if (minNotNull) assert(min > 0, new ZeroOrLowerValueException());
    if (maxNotNull) assert(max > 0, new ZeroOrLowerValueException());
    if (minNotNull && maxNotNull) {
      assert(min < max, new MinHigherThanMax());
    }
  }
}

export namespace RTIValidation {
  export type Result<T extends TPrimitive> = T extends string
    ? RTIStringValidationResult
    : T extends number
    ? RTINumberValidationResult
    : never;
}
