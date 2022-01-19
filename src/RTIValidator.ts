import { RTIValidationError } from "./errors/RTIValidationError";
import { RTI } from "./RTI";
import { RTIT } from "./types/api-types";
import { MUtils } from "./utils/MUtils";

export type TRTIValidatorArgs = {
  schema: RTIT.Schema;
  valuesToValidate: any;
};

export class RTIValidator {
  public static validate<T extends RTI<any>>(
    args: TRTIValidatorArgs
  ): Readonly<RTIT.Interface<T>> {
    const { schema, valuesToValidate } = args;

    if (typeof valuesToValidate !== "object") {
      throw RTIValidationError.passedInValuesNotAnObject(valuesToValidate);
    }

    MUtils.entries(schema).forEach(([key, rtiObj]) => {
      if (key in valuesToValidate) {
        
        const val = valuesToValidate[key];
        const validation = rtiObj.validate(val);
  
        if (!validation.passed) {
          throw RTIValidationError.criteriaNotMet(
            valuesToValidate,
            validation,
            key
          );
        }
        
      } else {
        if (!rtiObj.isOptional()) {
          console.log({ key, isOptional: rtiObj.isOptional() });
          throw RTIValidationError.requiredEntryNotIncluded(
            valuesToValidate,
            key
          );
        } 
      }

   
    });

    const copy = { ...valuesToValidate };
    Object.freeze(copy);

    return copy;
  }
}
