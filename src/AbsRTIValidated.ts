import {
  EValidationError,
  RTIValidationError,
} from "./errors/RTIValidationError";
import { RTInterface } from "./types/RTInterface";
import { MUtils } from "./utils/MUtils";

export abstract class AbsRTIValidated<T extends RTInterface> {
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
