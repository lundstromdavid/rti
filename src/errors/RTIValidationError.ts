import { TRTIValidation } from "../object-types/ValidationTypes";
import { TPrimitive } from "../types/Primitive";

export enum EValidationError {
  passedValuesNotAnObject,
  requiredEntryNotIncluded,
  validationFailedToPass,
}

interface IErrorArgs<T extends TPrimitive> {
  error: EValidationError;
  valuesPassedIn: any;
  failedOn?: string | number | symbol;
  results?: TRTIValidation<T>;
}

export class RTIValidationError<T extends TPrimitive> implements IErrorArgs<T> {
  readonly error: EValidationError;
  readonly valuesPassedIn: any;
  readonly failedOn?: string;
  readonly results?: TRTIValidation<T>;

  private constructor(args: IErrorArgs<T>) {
    Object.setPrototypeOf(this, RTIValidationError.prototype);
    Object.assign(this, args);
  }

  public static passedValuesNotAnObject(valuesPassedIn: any) {
    return new RTIValidationError({
      error: EValidationError.passedValuesNotAnObject,
      valuesPassedIn,
    });
  }

  public static requiredEntryNotIncluded(
    valuesPassedIn: any,
    failedOn: IErrorArgs<any>["failedOn"]
  ) {
    return new RTIValidationError({
      error: EValidationError.requiredEntryNotIncluded,
      valuesPassedIn,
      failedOn,
    });
  }

  public static validationFailedToPass<T extends TPrimitive>(
    valuesPassedIn: any,
    results: TRTIValidation<T>
  ) {
    return new RTIValidationError({
      error: EValidationError.validationFailedToPass,
      valuesPassedIn,
      results,
    });
  }
}
