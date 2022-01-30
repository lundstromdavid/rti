import { RTIBuilder } from "../classes/builders/RTIBuilder";
import { RTIBool } from "../classes/primitive/RTIBool";
import { RTINumber } from "../classes/primitive/RTINumber";
import { RTINumericLiteral } from "../classes/primitive/RTINumericLiteral";
import { RTIString } from "../classes/primitive/RTIString";
import { RTIStringLiteral } from "../classes/primitive/RTIStringLiteral";
import { RTIClass } from "../classes/RTIClass";
import { RTIUnion } from "../classes/RTIUnion";
import { RTI } from "../RTI";
import { TPrimitive, TPrimitiveToString } from "./local-types";

/*
Type definitions which filter keys
*/
namespace Filter {
  export type OnlyRTIClass<
    S extends RTIT.SchemaArg,
    K extends keyof S
  > = S[K] extends RTIClass<any, any> ? K : never;

  export type OnlyRTIBuilder<
    S extends RTIT.SchemaArg,
    K extends keyof S
  > = S[K] extends RTIBuilder<any, any> ? K : never;

  export type OnlyRequired<
    R extends RTIT.Schema,
    K extends keyof R
  > = R[K] extends RTIClass<any, true> ? never : K;

  export type OnlyOptional<
    R extends RTIT.Schema,
    K extends keyof R
  > = R[K] extends RTIClass<any, true> ? K : never;
}

/*
Type definitions which maps a type to something else
*/
export namespace RTIMap {
  export type SchemaArgToSchema<T extends RTIT.SchemaArg> = {
    [key in keyof T as Filter.OnlyRTIClass<T, key>]: T[key];
  } & {
    [key in keyof T as Filter.OnlyRTIBuilder<
      T,
      key
    >]: T[key] extends RTIBuilder<any, infer Class> ? Class : never;
  };

  export type RTIClassToPrimitive<T> = T extends RTIBuilder<any, infer Class>
    ? RTIClassToPrimitive<Class>
    : T extends RTIString<any>
    ? string
    : T extends RTIStringLiteral<any, infer Strings>
    ? Strings
    : T extends RTIBool<any>
    ? boolean
    : T extends RTINumber<any>
    ? number
    : T extends RTINumericLiteral<any, infer Numbers>
    ? Numbers
    : T extends RTIUnion<any, infer Objects>
    ? RTIClassToPrimitive<Objects>
    : never;
}

export namespace RTIT {
  export type Schema = Record<string | number | symbol, RTIClass<any, any>>;
  // Hmm
  export type SchemaArg = Record<
    string | number | symbol,
    RTIClass<any, any> | RTIBuilder<any, any>
  >;

  export type Interface<T extends RTI<any>> = T extends RTI<infer S>
    ? _Interface<RTIMap.SchemaArgToSchema<S>>
    : never;

  type _Interface<S extends Schema> = Omit<
    {
      [key in keyof S as Filter.OnlyRequired<
        S,
        key
      >]: RTIMap.RTIClassToPrimitive<S[key]>;
    } & {
      [key in keyof S as Filter.OnlyOptional<
        S,
        key
      >]?: RTIMap.RTIClassToPrimitive<S[key]>;
    },
    ""
  >;

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

  export interface IUnionValidation {
    passed: boolean;
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
