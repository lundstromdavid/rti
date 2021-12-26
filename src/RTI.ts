import { AbsRTIValidated } from "./AbsRTIValidated";
import { RTIBool } from "./object-types/RTIBool";
import { RTINumber } from "./object-types/RTINumber";
import { RTIString } from "./object-types/RTIString";
import {
  TBooleanValidation,
  TNumberValidation,
  TStringValidation
} from "./object-types/ValidationTypes";
import { RTInterface } from "./types/RTInterface";


export class RTI<T extends RTInterface> {
  constructor(private readonly objects: T) {}

  static create<T extends RTInterface>(obj: T) {
    return new RTI(obj);
  }

  validate(valuesToValidate: any): RTIValidated<T> {
    return new RTIValidated({
      objects: this.objects,
      valuesToValidate,
    });
  }
}

class RTIValidated<T extends RTInterface> extends AbsRTIValidated<T> {}

export namespace RTI {
  export const string = () => new RTIString();
  export const number = () => new RTINumber();
  export const boolean = () => new RTIBool();

  export type Interface<T extends RTI<any>> = T extends RTI<infer U>
    ? {
        [key in keyof U as RequiredKey<key>]: RTIToPrimitive<U[key]>;
      } & {
        [key in keyof U as OptionalKey<key>]?: RTIToPrimitive<U[key]>;
      }
    : never;

  type RequiredKey<K> = K extends `${infer pre}?${infer rest}` ? never : K;
  type OptionalKey<K> = K extends `${infer pre}?${infer rest}` ? pre : never;

  type RTIToPrimitive<T> = T extends RTIString
    ? string
    : T extends RTIBool
    ? boolean
    : T extends RTINumber
    ? number
    : never;

  type RTIToValidation<T> = T extends RTIString
    ? TStringValidation
    : T extends RTIBool
    ? TBooleanValidation
    : T extends RTINumber
    ? TNumberValidation
    : never;

  export type Validations<T extends RTI<any>> = T extends RTI<infer U>
    ? {
        [key in keyof U]?: RTIToValidation<U[key]>;
      }
    : never;
}
