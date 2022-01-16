import { IOptional } from "./object-types/optionals/IOptional";
import { RTIOptionalBool } from "./object-types/optionals/RTIOptionalBool";
import { RTIOptionalNumber } from "./object-types/optionals/RTIOptionalNumber";
import { RTIOptionalNumericLiteral } from "./object-types/optionals/RTIOptionalNumericLiteral";
import { RTIOptionalString } from "./object-types/optionals/RTIOptionalString";
import { RTIOptionalStringLiteral } from "./object-types/optionals/RTIOptionalStringLiteral";
import { RTIBool } from "./object-types/primitive/RTIBool";
import { RTINumber } from "./object-types/primitive/RTINumber";
import { RTINumericLiteral } from "./object-types/primitive/RTINumericLiteral";
import { RTIString } from "./object-types/primitive/RTIString";
import { RTIStringLiteral } from "./object-types/primitive/RTIStringLiteral";
import { RTIValidator, TRTIValidatorArgs } from "./RTIValidator";
import { RTISchema } from "./types/RTISchema";
import assert from "./utils/Assert";
import { MUtils } from "./utils/MUtils";

type ValidatedArguments = { [argumentName: string]: RTI.Validated<any> };
type AssertValidReturn<T extends ValidatedArguments> = {
  [key in keyof T as StripFirstUnderscore<key>]: T[key]["values"];
};
type StripFirstUnderscore<key> = key extends `_${infer rest}` ? rest : key;

export class RTI<T extends RTISchema> {
  constructor(private readonly schema: T) {}

  private static stripFirstUnderscore<T extends ValidatedArguments>(
    key: keyof T
  ): StripFirstUnderscore<keyof T> {
    if (typeof key === "string" && key.substring(0, 1) === "_") {
      return key.substring(1) as StripFirstUnderscore<keyof T>;
    }
    return key as StripFirstUnderscore<keyof T>;
  }

  static assertValid<Args extends ValidatedArguments>(
    validated: Args
  ): AssertValidReturn<Args> {
    // Using this type does not let me index it with the below "stripped" variable
    // const returnVal: Partial<AssertValidReturn<Args>> = {};
    const returnVal: any = {};
    MUtils.entries(validated).forEach(([key, value]) => {
      assert(value instanceof RTI.Validated);
      const stripped = this.stripFirstUnderscore(key);
      returnVal[stripped] = value.values;
    });
    return returnVal as AssertValidReturn<Args>;
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
  static stringLiteral<T extends string>(...values: T[]) {
    return new RTIOptionalStringLiteral<T>(...values);
  }
  static numericLiteral<T extends number>(...values: T[]) {
    return new RTIOptionalNumericLiteral<T>(...values);
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

  export enum Case {
    sensitive,
    insensitive,
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

  type Required<R extends RTISchema, K extends keyof R> = R[K] extends IOptional
    ? never
    : K;
  type Optional<R extends RTISchema, K extends keyof R> = R[K] extends IOptional
    ? K
    : never;

  type RTIToPrimitive<T> = T extends RTIString
    ? string
    : T extends RTIStringLiteral<infer Strings>
    ? Strings
    : T extends RTIBool
    ? boolean
    : T extends RTINumber
    ? number
    : T extends RTINumericLiteral<infer Numbers>
    ? Numbers
    : never;
}

export const string = () => RTI.string;
export function stringLiteral<T extends string>(...args: T[]) {
  return new RTIStringLiteral<T>(...args);
}
export const number = () => RTI.number;
export function numericLiteral<T extends number>(...args: T[]) {
  return new RTINumericLiteral<T>(...args);
}

export const boolean = () => RTI.boolean;
export const optional = () => RTI.optional;
