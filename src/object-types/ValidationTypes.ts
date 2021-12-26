import { TPrimitive, TPrimitiveToString } from "../types/Primitive";

export const RTIUnchecked: TRTIUnchecked = "unchecked";
export type TRTIUnchecked = "unchecked";

export type TPrimitiveToValidation<T extends TPrimitive> = T extends string
  ? TStringValidation
  : T extends number
  ? TNumberValidation
  : TBooleanValidation;

export type TTypeConfirmation<T extends TPrimitive> =
  | true
  | {
      expected: TPrimitiveToString<T>;
      actual: string;
    };

export type TBaseValidation<T extends TPrimitive> = {
  discriminator: TPrimitiveToString<T>;
  passed: boolean;
  correctType: TTypeConfirmation<T>;
  customValidationPassed: boolean | TRTIUnchecked;
}

export interface TStringValidation extends TBaseValidation<string> {
  longEnough: boolean | TRTIUnchecked;
  notTooLong: boolean | TRTIUnchecked;
  containsAllProvidedValues: boolean | TRTIUnchecked;
  containsAtLeastOneProvidedValue: boolean | TRTIUnchecked;
}

export interface TNumberValidation extends TBaseValidation<number> {
  bigEnough: boolean | TRTIUnchecked;
  notTooBig: boolean | TRTIUnchecked;
  passedIntegerCheck: boolean | TRTIUnchecked;
}

export interface TBooleanValidation extends TBaseValidation<boolean> {}

export type TRTIValidation<T extends TPrimitive> = TPrimitiveToValidation<T>

export type TSingleValidation = TRTIUnchecked | boolean;