import { RTIValidationError } from "./errors/RTIValidationError";
import { RTInterface } from "./types/RTInterface";
import { MUtils } from "./utils/MUtils";

export type TRTIValidatorArgs<T extends RTInterface> = {
	objects: T;
    valuesToValidate: any;
}

export class RTIValidator {
  public static validate<T extends RTInterface>(args: TRTIValidatorArgs<T>) {
    const { objects, valuesToValidate } = args;

    if (typeof valuesToValidate !== "object") {
      throw RTIValidationError.passedValuesNotAnObject(valuesToValidate);
    }

    MUtils.entries(objects).forEach(([key, rtiObj]) => {
      if (!(key in valuesToValidate)) {
        if (!rtiObj.isOptional()) {
          throw RTIValidationError.requiredEntryNotIncluded(
            valuesToValidate,
            key
          );
        }
      }

      const val = valuesToValidate[key];

      const validation = rtiObj.validate(val);

      if (!validation.passed) {
        throw RTIValidationError.validationFailedToPass(
          valuesToValidate,
          validation
        );
      }
    });
  }
}