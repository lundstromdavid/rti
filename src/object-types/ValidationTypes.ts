import { TPrimitive, TPrimitiveToString } from "../types/Primitive";

export const RTIUnchecked: TRTIUnchecked = "unchecked";
export type TRTIUnchecked = "unchecked";

export type TypeConfirmation<T extends TPrimitive> =
  | true
  | {
      expected: TPrimitiveToString<T>;
      actual: string;
    };

export interface RTIValidation<T extends TPrimitive> {
  discriminator: TPrimitiveToString<T>;
  passed: boolean;
  correctType: TypeConfirmation<T>;
  customValidationPassed: boolean | TRTIUnchecked;
}

export interface RTIStringValidation extends RTIValidation<string> {
  longEnough: boolean | TRTIUnchecked;
  notTooLong: boolean | TRTIUnchecked;
  containsAllProvidedValues: boolean | TRTIUnchecked;
  containsAtLeastOneProvidedValue: boolean | TRTIUnchecked;
}

export interface RTINumberValidation extends RTIValidation<number> {
  bigEnough: boolean | TRTIUnchecked;
  notTooBig: boolean | TRTIUnchecked;
  passedIntegerCheck: boolean | TRTIUnchecked;
}

export interface RTIBooleanValidation extends RTIValidation<boolean> {}

export type TRTIValidation =
  | RTIStringValidation
  | RTINumberValidation
  | RTIBooleanValidation;
