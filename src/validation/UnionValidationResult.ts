import { RTIBuilder } from "../classes/builders/RTIBuilder";
import { RTIClass } from "../classes/RTIClass";
import { AllExceptUnion, AllowedInUnion } from "../classes/RTIUnion";
import { RTIT } from "../types/api-types";

export class UnionValidationResult<T extends AllowedInUnion>
  implements RTIT.IUnionValidation
{
  readonly discriminator = "unionValidationResult";
  readonly passed: boolean;

  constructor(value: any, readonly unionValues: T[]) {
    this.passed = unionValues.some((obj) => {
      let rtiClass: RTIClass<AllExceptUnion, any>;
      if (obj instanceof RTIClass) {
        rtiClass = obj;
      } else {
        rtiClass = obj.lock();
      }

      return rtiClass.validate(value).passed;
    });
  }
}
