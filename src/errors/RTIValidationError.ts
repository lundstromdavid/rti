import { TRTIValidation } from "../object-types/ValidationTypes";
import { TPrimitive } from "../types/Primitive";

export enum EValidationError {
  passedInValuesNotAnObject = "Passed in values not an object",
  requiredEntryNotIncluded = "Required entry not included",
  criteriaNotMet =  "Criteria not met",
}

interface IErrorArgs<T extends TPrimitive> {
  error: EValidationError;
  valuesPassedIn: any;
  failedOnProperty?: string | number | symbol;
  results?: TRTIValidation<T>;
}

export class RTIValidationError<T extends TPrimitive> implements IErrorArgs<T> {
  readonly error: EValidationError;
  readonly valuesPassedIn: any;
  readonly failedOnProperty?: string | number | symbol;
  readonly results?: TRTIValidation<T>;

  private constructor(args: IErrorArgs<T>) {
    Object.setPrototypeOf(this, RTIValidationError.prototype);
    Object.assign(this, args);
  }

  public static passedInValuesNotAnObject(valuesPassedIn: any) {
    return new RTIValidationError({
      error: EValidationError.passedInValuesNotAnObject,
      valuesPassedIn,
    });
  }

  public static requiredEntryNotIncluded(
    valuesPassedIn: any,
    failedOnProperty: IErrorArgs<any>["failedOnProperty"]
  ) {
    return new RTIValidationError({
      error: EValidationError.requiredEntryNotIncluded,
      valuesPassedIn,
      failedOnProperty,
    });
  }

  public static rulesNotFulfilled<T extends TPrimitive>(
    valuesPassedIn: any,
    results: TRTIValidation<T>,
    failedOnProperty: IErrorArgs<any>["failedOnProperty"]
  ) {
    return new RTIValidationError({
      error: EValidationError.criteriaNotMet,
      valuesPassedIn,
      results,
      failedOnProperty
    });
  }
}
