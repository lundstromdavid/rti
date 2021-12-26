import { RTIValidationError } from "./errors/RTIValidationError";
import { RTIBool } from "./object-types/RTIBool";
import { RTINumber } from "./object-types/RTINumber";
import { RTIOptionalBool } from "./object-types/RTIOptionalBool";
import { RTIOptionalNumber } from "./object-types/RTIOptionalNumber";
import { RTIOptionalString } from "./object-types/RTIOptionalString";
import { RTIString } from "./object-types/RTIString";
import { RTIValidator, TRTIValidatorArgs } from "./RTIValidator";
import { RTInterface } from "./types/RTInterface";

export class RTI<T extends RTInterface> {
  constructor(private readonly objects: T) {}

  static get string() {
    return new RTIString();
  }
  static get number() {
    return new RTINumber();
  }
  static get boolean() {
    return new RTIBool();
  }
  static get optional() {
    return Optional;
  }

  static create<T extends RTInterface>(obj: T) {
    return new RTI(obj);
  }
  static create2<T extends RTInterface>(obj: T) {
    return "";
  }

  validate(valuesToValidate: any): RTIValidated<T> {
    return new RTIValidated({
      objects: this.objects,
      valuesToValidate,
    });
  }

  validateSafely(valuesToValidate: any):
    | { validated: RTIValidated<T>; error?: false }
    | {
        validated?: false;
        error: RTIValidationError<any>;
      } {
    throw "This doesnt work";
    try {
      return {
        validated: this.validate(valuesToValidate),
      };
    } catch (error) {
      if (error instanceof RTIValidationError) {
        return {
          error,
        };
      }
      throw new Error("This shouldn't happen");
    }
  }
}
class Optional {
  static get string() {
    return new RTIOptionalString();
  }
  static get number() {
    return new RTIOptionalNumber();
  }
  static get boolean() {
    return new RTIOptionalBool();
  }
}

class RTIValidated<T extends RTInterface> {
  constructor(args: TRTIValidatorArgs<T>) {
    RTIValidator.validate(args);
    Object.assign(this, args.valuesToValidate);
  }
}

// This causes the tests to crash ??
/* const test: RTIValidated<{
  testProperty: RTIString;
}> = new RTIValidated({} as any);
 */
export namespace RTI {
  export type ConvertToInterface<T extends RTI<any>> = T extends RTI<infer U>
    ? Omit<
        {
          [key in keyof U as Required<U, key>]: RTIToPrimitive<U[key]>;
        } & {
          [key in keyof U as Optional<U, key>]?: RTIToPrimitive<U[key]>;
        },
        ""
      >
    : never;

  type TOptional = RTIOptionalBool | RTIOptionalNumber | RTIOptionalString;

  type Required<
    R extends RTInterface,
    K extends keyof R
  > = R[K] extends TOptional ? never : K;
  type Optional<
    R extends RTInterface,
    K extends keyof R
  > = R[K] extends TOptional ? K : never;

  type RTIToPrimitive<T> = T extends RTIString
    ? string
    : T extends RTIBool
    ? boolean
    : T extends RTINumber
    ? number
    : never;
}
