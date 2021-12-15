import { RTIBool } from "./object-types/RTIBool";
import { RTINumber } from "./object-types/RTINumber";
import { RTIString } from "./object-types/RTIString";
import {
  RTIBooleanValidation,
  RTINumberValidation,
  RTIStringValidation
} from "./object-types/ValidationTypes";
import { RTInterface } from "./types/RTInterface";
import { MUtils } from "./utils/MUtils";

export class RTI<T extends RTInterface> {


  constructor(private readonly objects: T) {
  }

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

class RTIValidated<T extends RTInterface> {
  constructor(
    private props: {
      objects: T;
      valuesToValidate: any;
    }
  ) {
    this.validate();
  }

  private validate() {
    
    const { objects, valuesToValidate } = this.props;

    if (typeof valuesToValidate !== "object") {
      throw RTIValidationError.notAnObject();
    }

    MUtils.entries(objects).forEach(([key, rtiObj]) => {
      if (!(key.toString() in valuesToValidate)) {
        if (!rtiObj.isOptional()) {
          throw new Error("xd");
        } else return;
      }

      const val = valuesToValidate[key];

      const validation = rtiObj.validate(val);

      if (!validation.passed) {
        throw new Error("asdksajkd");
      }
    });
  }
}

export class RTIValidationError {
  private constructor() {
    Object.setPrototypeOf(this, RTIValidationError.prototype);
  }

  public static notAnObject() {
    return new RTIValidationError();
  }
}

export namespace RTI {
  export const string = () => new RTIString();
  export const number = () => new RTINumber();
  export const boolean = () => new RTIBool();

  /*  export type Interface<T extends RTI<any>> = T extends RTI<infer U>
    ? {
        [key in keyof U]: RTIToPrimitive<U[key]>;
      }
    : never; */

  export type Interface<T extends RTI<any>> = T extends RTI<infer U>
    ? {
        [key in keyof U as RequiredKey<key>]: RTIToPrimitive<U[key]>;
      } &
        {
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
    ? RTIStringValidation
    : T extends RTIBool
    ? RTIBooleanValidation
    : T extends RTINumber
    ? RTINumberValidation
    : never;

  export type Validations<T extends RTI<any>> = T extends RTI<infer U>
    ? {
        [key in keyof U]?: RTIToValidation<U[key]>;
      }
    : never;
}
