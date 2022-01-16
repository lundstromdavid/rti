import { TPrimitive, TPrimitiveToString } from "../types/Primitive";



export type TTypeCheck<T extends TPrimitive> = {
  expected: TPrimitiveToString<T>;
  actual: string;
  passed: boolean;
};

interface IBaseValidation<T extends TPrimitive> {
  passed: boolean;
  typeCheck: TTypeCheck<T>;
};

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
  failed = "failed"
}

export namespace CriteriaValidation {
  export function fromBool(passed: boolean): CriteriaValidation {
    return passed ? CriteriaValidation.passed : CriteriaValidation.failed;
  }
}

