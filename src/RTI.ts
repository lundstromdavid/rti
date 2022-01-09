import { RTIValidationError } from "./errors/RTIValidationError";
import { RTIBool } from "./object-types/RTIBool";
import { RTINumber } from "./object-types/RTINumber";
import { RTIOptionalBool } from "./object-types/RTIOptionalBool";
import { RTIOptionalNumber } from "./object-types/RTIOptionalNumber";
import { RTIOptionalString } from "./object-types/RTIOptionalString";
import { RTIString } from "./object-types/RTIString";
import { RTIValidator, TRTIValidatorArgs } from "./RTIValidator";
import { RTISchema } from "./types/RTISchema";
import assert from "./utils/Assert";
import { MUtils } from "./utils/MUtils";

type ValidatedArguments = { [argumentName: string]: RTI.Validated<any> };



export class RTI<T extends RTISchema> {
  constructor(private readonly schema: T) {}

  static assertValid(validated: ValidatedArguments) {
    MUtils.entries(validated).forEach(([key, value]) => {
      assert(value instanceof RTI.Validated);
    });
  }

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

  static create<T extends RTISchema>(obj: T) {
    return new RTI(obj);
  }

  validate(valuesToValidate: any): RTI.Validated<this> {
    return new RTI.Validated({
      schema: this.schema,
      valuesToValidate,
    });
  }

  /*  validateSafely(valuesToValidate: any):
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
  } */
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

// This causes the tests to crash ??
/* const test: RTIValidated<{
  testProperty: RTIString;
}> = new RTIValidated({} as any);
 */
export namespace RTI {
  export class Validated<T extends RTI<any>> {
    readonly values: Readonly<RTI.ConvertToInterface<T>>;

    public constructor(args: TRTIValidatorArgs) {
      this.values = RTIValidator.validate(args);
    }
  }

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

  type Required<R extends RTISchema, K extends keyof R> = R[K] extends TOptional
    ? never
    : K;
  type Optional<R extends RTISchema, K extends keyof R> = R[K] extends TOptional
    ? K
    : never;

  type RTIToPrimitive<T> = T extends RTIString
    ? string
    : T extends RTIBool
    ? boolean
    : T extends RTINumber
    ? number
    : never;
}


const string = RTI.string;
const number = RTI.number;
const boolean = RTI.number;
const optional = RTI.optional;
export {string, number, boolean, optional};