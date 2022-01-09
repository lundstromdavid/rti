import { RTIValidationError } from "./errors/RTIValidationError";
import { RTI } from "./RTI";
import { RTISchema } from "./types/RTISchema";
import { MUtils } from "./utils/MUtils";

export type TRTIValidatorArgs = {
  schema: RTISchema;
  valuesToValidate: any;
};

export class RTIValidator {
  public static validate<T extends RTI<any>>(args: TRTIValidatorArgs): Readonly<RTI.ConvertToInterface<T>> {
    const { schema, valuesToValidate } = args;

    if (typeof valuesToValidate !== "object") {
      throw RTIValidationError.passedValuesNotAnObject(valuesToValidate);
    }

    MUtils.entries(schema).forEach(([key, rtiObj]) => {
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

    const copy = {...valuesToValidate};
    Object.freeze(copy);

    return copy;
  }
}
