import { RTIBoolBuilder } from "./classes/builders/RTIBoolBuilder";
import { RTINumberBuilder } from "./classes/builders/RTINumberBuilder";
import { RTINumericLiteralBuilder } from "./classes/builders/RTINumericLiteralBuilder";
import { RTIStringBuilder, TStringBuilder } from "./classes/builders/RTIStringBuilder";
import { RTIStringLiteralBuilder } from "./classes/builders/RTIStringLiteralBuilder";
import { RTIUnionBuilder } from "./classes/builders/RTIUnionBuilder";
import { RTIClass } from "./classes/RTIClass";
import { AllowedInUnion } from "./classes/RTIUnion";
import { RTIValidator, TRTIValidatorArgs } from "./RTIValidator";
import { RTIMap, RTIT } from "./types/api-types";
import assert from "./utils/Assert";
import { MUtils } from "./utils/MUtils";

type ValidatedArguments = { [argumentName: string]: RTI.Validated<any> };
type AssertValidReturn<T extends ValidatedArguments> = {
  [key in keyof T as StripFirstUnderscore<key>]: T[key]["values"];
};
type StripFirstUnderscore<key> = key extends `_${infer rest}` ? rest : key;

export class RTI<T extends RTIT.SchemaArg> {
  private readonly schema: RTIMap.SchemaArgToSchema<T>;

  constructor(schemaArg: T) {
    this.schema = this.convertToSchema(schemaArg);
  }

  private convertToSchema(arg: T): RTIMap.SchemaArgToSchema<T> {
    const schema: Partial<RTIMap.SchemaArgToSchema<T>> = {};
    MUtils.entries(arg).forEach(([_key, value]) => {
      //@ts-ignore
      const key: keyof RTIMap.SchemaArgToSchema<T> = _key;
      if (value instanceof RTIClass) {
        //@ts-ignore
        schema[key] = value;
      } else {
        schema[key] = value.lock();
      }
    });
    return schema as RTIMap.SchemaArgToSchema<T>;
  }

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

  static create<T extends RTIT.SchemaArg>(obj: T) {
    return new RTI(obj);
  }

  validate(valuesToValidate: any): RTI.Validated<this> {
    return new RTI.Validated({
      schema: this.schema,
      valuesToValidate,
    });
  }
}

export namespace RTI {
  export class Validated<T extends RTI<any>> {
    readonly values: Readonly<RTIT.Interface<T>>;

    public constructor(args: TRTIValidatorArgs) {
      this.values = RTIValidator.validate(args);
    }
  }

  export function string(): TStringBuilder<false> {
    return RTIStringBuilder.required();
  }

  export function stringLiteral<T extends string>(...args: T[]) {
    return RTIStringLiteralBuilder.required(...args);
  }

  export function number() {
    return RTINumberBuilder.required();
  }

  export function numericLiteral<T extends number>(...args: T[]) {
    return RTINumericLiteralBuilder.required(...args);
  }

  export function boolean() {
    RTIBoolBuilder.required();
  }

  export function union<T extends AllowedInUnion[]>(
    ...args: T
  ): RTIUnionBuilder<false, T[number]> {
    return RTIUnionBuilder.required(...args);
  }

  export const optional = {
    string: function (): TStringBuilder<true> {
      return RTIStringBuilder.optional();
    },

    stringLiteral: function <T extends string>(...values: T[]) {
      return RTIStringLiteralBuilder.optional(...values);
    },

    number: function () {
      return RTINumberBuilder.optional();
    },

    numericLiteral: function <T extends number>(...values: T[]) {
      return RTINumericLiteralBuilder.optional(...values);
    },

    boolean: function () {
      return RTIBoolBuilder.optional();
    },

    union: function <T extends AllowedInUnion[]>(
      ...args: T
    ): RTIUnionBuilder<true, T[number]> {
      return RTIUnionBuilder.optional(...args);
    },
  };
}

export const string = RTI.string;
export const stringLiteral = RTI.stringLiteral;
export const number = RTI.number;
export const numericLiteral = RTI.numericLiteral;
export const boolean = RTI.boolean;
export const union = RTI.union;

export const optional = RTI.optional;
