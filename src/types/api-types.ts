import { RTIBool } from "../classes/primitive/RTIBool";
import { RTINumber } from "../classes/primitive/RTINumber";
import { RTINumericLiteral } from "../classes/primitive/RTINumericLiteral";
import { RTIString } from "../classes/primitive/RTIString";
import { RTIStringLiteral } from "../classes/primitive/RTIStringLiteral";
import { RTIClass } from "../classes/RTIClass";
import { RTI } from "../RTI";
import { TPrimitive, TPrimitiveToString } from "./local-types";

export namespace RTIT {
  export type Schema = Record<string | number | symbol, RTIClass<any, any>>;

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

  type Required<R extends Schema, K extends keyof R> = R[K] extends RTIClass<any, true>
    ? never
    : K;
  type Optional<R extends Schema, K extends keyof R> = R[K] extends RTIClass<any, true>
    ? K
    : never;

  type RTIToPrimitive<T> = T extends RTIString<any>
    ? string
    : T extends RTIStringLiteral<any, infer Strings>
    ? Strings
    : T extends RTIBool<any>
    ? boolean
    : T extends RTINumber<any>
    ? number
    : T extends RTINumericLiteral<any, infer Numbers>
    ? Numbers
    : never;

  // Not a type, clearly
  export enum Case {
    sensitive,
    insensitive,
  }

  export type TypeCheck<T extends TPrimitive> = {
    expected: TPrimitiveToString<T>;
    actual: string;
    passed: boolean;
  };

  interface IBaseValidation<T extends TPrimitive> {
    passed: boolean;
    typeCheck: TypeCheck<T>;
  }

  export interface IStringValidation extends IBaseValidation<string> {
    longEnough: CriteriaValidation;
    notTooLong: CriteriaValidation;
    containsAllProvidedValues: CriteriaValidation;
    containsAtLeastOneProvidedValue: CriteriaValidation;
    customValidationPassed: CriteriaValidation;
  }

  export interface INumberValidation extends IBaseValidation<number> {
    bigEnough: CriteriaValidation;
    notTooBig: CriteriaValidation;
    passedIntegerCheck: CriteriaValidation;
    customValidationPassed: CriteriaValidation;
  }

  export interface IBooleanValidation extends IBaseValidation<boolean> {}

  export interface INumericLiteralValidation extends IBaseValidation<number> {
    valueAllowed: CriteriaValidation;
  }

  export interface IStringLiteralValidation extends IBaseValidation<string> {
    valueAllowed: CriteriaValidation;
  }

  export enum CriteriaValidation {
    unchecked = "unchecked",
    noRestriction = "no_restriction",
    passed = "passed",
    failed = "failed",
  }

  export namespace CriteriaValidation {
    export function fromBool(passed: boolean): CriteriaValidation {
      return passed ? CriteriaValidation.passed : CriteriaValidation.failed;
    }
  }
}
