import { TPrimitive, TPrimitiveToString } from "../types/Primitive";

export type TPrimitiveToValidation<T extends TPrimitive> = T extends string
  ? TStringValidation
  : T extends number
  ? TNumberValidation
  : TBooleanValidation;

export type TTypeCheck<T extends TPrimitive> = {
  expected: TPrimitiveToString<T>;
  actual: string;
  passed: boolean;
};

export type TBaseValidation<T extends TPrimitive> = {
  discriminator: TPrimitiveToString<T>;
  passed: boolean;
  typeCheck: TTypeCheck<T>;
  customValidationPassed: ESingleValidation;
};

export interface TStringValidation extends TBaseValidation<string> {
  longEnough: ESingleValidation;
  notTooLong: ESingleValidation;
  containsAllProvidedValues: ESingleValidation;
  containsAtLeastOneProvidedValue: ESingleValidation;
}

export interface TNumberValidation extends TBaseValidation<number> {
  bigEnough: ESingleValidation;
  notTooBig: ESingleValidation;
  passedIntegerCheck: ESingleValidation;
}

export interface TBooleanValidation extends TBaseValidation<boolean> {}

export type TRTIValidation<T extends TPrimitive> = TPrimitiveToValidation<T>;

export enum ESingleValidation {
  unchecked,
  noRestriction,
  passed,
  failed
}

export namespace ESingleValidation {
  export function fromBool(passed: boolean): ESingleValidation {
    return passed ? ESingleValidation.passed : ESingleValidation.failed;
  }
}

