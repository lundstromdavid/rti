import { RTIBool } from "./classes/primitive/RTIBool";
import { RTINumber } from "./classes/primitive/RTINumber";
import { RTINumericLiteral } from "./classes/primitive/RTINumericLiteral";
import { RTIString } from "./classes/primitive/RTIString";
import { RTIStringLiteral } from "./classes/primitive/RTIStringLiteral";
import { RTIClass } from "./classes/RTIClass";
import { AllowedInUnion, RTIUnion } from "./classes/RTIUnion";
import { RTIValidator, TRTIValidatorArgs } from "./RTIValidator";
import { RTIT } from "./types/api-types";
import assert from "./utils/Assert";
import { MUtils } from "./utils/MUtils";

type ValidatedArguments = { [argumentName: string]: RTI.Validated<any> };
type AssertValidReturn<T extends ValidatedArguments> = {
  [key in keyof T as StripFirstUnderscore<key>]: T[key]["values"];
};
type StripFirstUnderscore<key> = key extends `_${infer rest}` ? rest : key;

export class RTI<T extends RTIT.Schema> {
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

  static create<T extends RTIT.Schema>(obj: T) {
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
    readonly values: Readonly<RTIT.ConvertToInterface<T>>;

    public constructor(args: TRTIValidatorArgs) {
      this.values = RTIValidator.validate(args);
    }
  }

  export const string = () => RTIString.required();
  export const stringLiteral = <T extends string>(...args: T[]) =>
    RTIStringLiteral.required(...args);
  export const number = () => RTINumber.required();
  export const numericLiteral = <T extends number>(...args: T[]) =>
    RTINumericLiteral.required(...args);
  export const boolean = () => RTIBool.required();
  export const union = <T extends AllowedInUnion[]>(...args: T): RTIUnion<false, T[number]> =>
    RTIUnion.required(...args);
  
  export const optional = {
    string: () => RTIString.optional(),
    stringLiteral: <T extends string>(...values: T[]) =>
      RTIStringLiteral.optional(...values),
    number: () => RTINumber.optional(),
    numericLiteral: <T extends number>(...values: T[]) =>
      RTINumericLiteral.optional(...values),
    boolean: () => RTIBool.optional(),
    union: <T extends AllowedInUnion[]>(...args: T): RTIUnion<true, T[number]> => RTIUnion.optional(...args),
  };
}

export const string = RTI.string;
export const stringLiteral = RTI.stringLiteral;
export const number = RTI.number;
export const numericLiteral = RTI.numericLiteral;
export const boolean = RTI.boolean;
export const union = RTI.union;

export const optional = RTI.optional;
