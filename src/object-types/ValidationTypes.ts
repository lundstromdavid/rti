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
  customValidationPassed: CriteriaValidation;
};

export interface TStringValidation extends TBaseValidation<string> {
  longEnough: CriteriaValidation;
  notTooLong: CriteriaValidation;
  containsAllProvidedValues: CriteriaValidation;
  containsAtLeastOneProvidedValue: CriteriaValidation;
}

export interface TNumberValidation extends TBaseValidation<number> {
  bigEnough: CriteriaValidation;
  notTooBig: CriteriaValidation;
  passedIntegerCheck: CriteriaValidation;
}

export interface TBooleanValidation extends TBaseValidation<boolean> {}

export type TRTIValidation<T extends TPrimitive> = TPrimitiveToValidation<T>;

export enum CriteriaValidation {
  unchecked = "unchecked",
  noRestriction = "no_restriction",
  passed = "passed",
  failed = "failed"
}

export namespace CriteriaValidation {
  export function fromBool(passed: boolean): CriteriaValidation {
    return passed ? CriteriaValidation.passed : CriteriaValidation.failed;
  }
}

