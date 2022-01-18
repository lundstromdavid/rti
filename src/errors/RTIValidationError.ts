import { TPrimitive } from "../types/local-types";
import { ValidationTypes } from "../validation/ValidationHelper";

export enum EValidationError {
  passedInValuesNotAnObject = "Passed in values not an object",
  requiredEntryNotIncluded = "Required entry not included",
  criteriaNotMet =  "Criteria not met",
}

interface IErrorArgs<T extends TPrimitive, Literal extends boolean> {
  error: EValidationError;
  valuesPassedIn: any;
  failedOnProperty?: string | number | symbol;
  results?: ValidationTypes.Result<T, Literal>;
}

export class RTIValidationError<T extends TPrimitive, Literal extends boolean> implements IErrorArgs<T, Literal> {
  readonly error: EValidationError;
  readonly valuesPassedIn: any;
  readonly failedOnProperty?: string | number | symbol;
  readonly results?: ValidationTypes.Result<T, Literal>;

  private constructor(args: IErrorArgs<T, Literal>) {
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
    failedOnProperty: IErrorArgs<any, any>["failedOnProperty"]
  ) {
    return new RTIValidationError({
      error: EValidationError.requiredEntryNotIncluded,
      valuesPassedIn,
      failedOnProperty,
    });
  }

  public static criteriaNotMet<T extends TPrimitive, Literal extends boolean>(
    valuesPassedIn: any,
    results: ValidationTypes.Result<T, Literal>,
    failedOnProperty: IErrorArgs<any, any>["failedOnProperty"]
  ) {
    return new RTIValidationError({
      error: EValidationError.criteriaNotMet,
      valuesPassedIn,
      results,
      failedOnProperty
    });
  }
}
