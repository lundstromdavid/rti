import { RTIBool } from "./object-types/RTIBool";
import { RTINumber } from "./object-types/RTINumeric";
import { RTIString } from "./object-types/RTIString";
import {
  RTIBooleanValidation,
  RTINumberValidation,
  RTIStringValidation,
} from "./object-types/ValidationTypes";
import { RTInterface } from "./types/RTInterface";
import { TRTIObject } from "./types/TRTIObject";
import { MUtils } from "./utils/MUtils";

type TRTI<T extends RTInterface> = {
  [key in keyof T as SanitizedKey<key>]: T[key];
};

type SanitizedKey<K> = K extends `${infer pre}?${infer rest}` ? pre : K;

export class RTI<T extends RTInterface> {
  private readonly objects = {};

  constructor(objects: TRTI<T>) {
    MUtils.entries(objects).forEach(([key, value]) => {
      const str = key.toString();
      if (str.endsWith("?")) {
        //@ts-ignore
        this.objects[str.slice(0, -1)] = value.optional();
      } else {
        //@ts-ignore
        this.objects[str] = value;
      }
    });
  }

  static create<T extends RTInterface>(obj: TRTI<T>) {
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
      objects: TRTI<T>;
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
