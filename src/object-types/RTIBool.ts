import { AbsRTIType } from "./AbsRTIType";
import { TBooleanValidation } from "./ValidationTypes";

export class RTIBool extends AbsRTIType<boolean> {
  private readonly type = "boolean";

  validate(value: any): never {
    throw "";
    /* return {
      discriminator: this.type,
      customValidationPassed: false,
      correctType: true,
      passed: typeof value === "boolean",
    }; */
  }
}
