import { RTIBool } from "./classes/primitive/RTIBool";
import { RTINumber } from "./classes/primitive/RTINumber";
import { RTINumericLiteral } from "./classes/primitive/RTINumericLiteral";
import { RTIString } from "./classes/primitive/RTIString";
import { RTIStringLiteral } from "./classes/primitive/RTIStringLiteral";
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

  static get string() {
    return RTIString.required();
  }
  static get number() {
    return RTIString.required();
  }
  static get boolean() {
    return RTIString.required();
  }
  static get optional() {
    return Optional;
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

class Optional {
  static get string() {
    return RTIString.optional();
  }
  static get number() {
    return RTINumber.optional();
  }
  static get boolean() {
    return RTIBool.optional();
  }
  static stringLiteral<T extends string>(...values: T[]) {
    return RTIStringLiteral.optional(...values);
  }
  static numericLiteral<T extends number>(...values: T[]) {
    return RTINumericLiteral.optional(...values);
  }
}

export namespace RTI {
  export class Validated<T extends RTI<any>> {
    readonly values: Readonly<RTIT.ConvertToInterface<T>>;

    public constructor(args: TRTIValidatorArgs) {
      this.values = RTIValidator.validate(args);
    }
  }

}

export const string = () => RTI.string;
export function stringLiteral<T extends string>(...args: T[]) {
  return RTIStringLiteral.required(...args);
}
export const number = () => RTI.number;
export function numericLiteral<T extends number>(...args: T[]) {
  return RTINumericLiteral.required(...args);
}

export const boolean = () => RTI.boolean;
export const optional = () => RTI.optional;