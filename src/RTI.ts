import { RTIBoolBuilder } from "./classes/builders/RTIBoolBuilder";
import { RTINumberBuilder } from "./classes/builders/RTINumberBuilder";
import { RTINumericLiteralBuilder } from "./classes/builders/RTINumericLiteralBuilder";
import { RTIStringBuilder } from "./classes/builders/RTIStringBuilder";
import { RTIStringLiteralBuilder } from "./classes/builders/RTIStringLiteralBuilder";
import { RTIUnionBuilder } from "./classes/builders/RTIUnionBuilder";
import { RTIClass } from "./classes/RTIClass";
import { AllowedInUnion } from "./classes/RTIUnion";
import { RTIValidator, TRTIValidatorArgs } from "./RTIValidator";
import { RTIT } from "./types/api-types";
import assert from "./utils/Assert";
import { MUtils } from "./utils/MUtils";

type ValidatedArguments = { [argumentName: string]: RTI.Validated<any> };
type AssertValidReturn<T extends ValidatedArguments> = {
  [key in keyof T as StripFirstUnderscore<key>]: T[key]["values"];
};
type StripFirstUnderscore<key> = key extends `_${infer rest}` ? rest : key;

export class RTI<T extends RTIT.SchemaArg> {

  private readonly schema: RTIT.SchemaArgToSchema<T>;
  
  constructor(schemaArg: T) {
    this.schema = this.convertToSchema(schemaArg);
  }

  private convertToSchema(arg: T): RTIT.SchemaArgToSchema<T> {
    const schema: Partial<RTIT.SchemaArgToSchema<T>> =  {};
    MUtils.entries(arg).forEach(([_key, value]) => {
      //@ts-ignore
      const key: keyof RTIT.SchemaArgToSchema<T> = _key;
      if (value instanceof RTIClass) {
        //@ts-ignore
        schema[key] = value;
      } else {
        schema[key] = value.lock();
      }
    })
    return schema as RTIT.SchemaArgToSchema<T>;
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

  export const string = () => RTIStringBuilder.required();
  export const stringLiteral = <T extends string>(...args: T[]) =>
    RTIStringLiteralBuilder.required(...args);
  export const number = () => RTINumberBuilder.required();
  export const numericLiteral = <T extends number>(...args: T[]) =>
    RTINumericLiteralBuilder.required(...args);
  export const boolean = () => RTIBoolBuilder.required();
  export const union = <T extends AllowedInUnion[]>(
    ...args: T
  ): RTIUnionBuilder<false, T[number]> => RTIUnionBuilder.required(...args);

  export const optional = {
    string: () => RTIStringBuilder.optional(),
    stringLiteral: <T extends string>(...values: T[]) =>
      RTIStringLiteralBuilder.optional(...values),
    number: () => RTINumberBuilder.optional(),
    numericLiteral: <T extends number>(...values: T[]) =>
      RTINumericLiteralBuilder.optional(...values),
    boolean: () => RTIBoolBuilder.optional(),
    union: <T extends AllowedInUnion[]>(
      ...args: T
    ): RTIUnionBuilder<true, T[number]> => RTIUnionBuilder.optional(...args),
  };
}

export const string = RTI.string;
export const stringLiteral = RTI.stringLiteral;
export const number = RTI.number;
export const numericLiteral = RTI.numericLiteral;
export const boolean = RTI.boolean;
export const union = RTI.union;

export const optional = RTI.optional;
