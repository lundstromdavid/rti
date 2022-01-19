import { UnionValidationResult } from "../validation/UnionValidationResult";
import { ValidationTypes } from "../validation/ValidationHelper";
import { RTIClass } from "./RTIClass";

type AllExceptUnion = Exclude<ValidationTypes.All, UnionValidationResult>;
export type AllowedInUnion = RTIClass<AllExceptUnion, any>;

export class RTIUnion<
  Optional extends boolean,
  T extends AllowedInUnion
> extends RTIClass<UnionValidationResult, Optional> {
  readonly unionValues: T[];

  private constructor(
    private readonly optional: Optional,
    ...unionValues: T[]
  ) {
    super();
    this.unionValues = unionValues;
  }

  static optional<T extends RTIClass<AllExceptUnion>>(...unionValues: T[]) {
    return new RTIUnion(true, ...unionValues);
  }
  static required<T extends RTIClass<AllExceptUnion>>(...unionValues: T[]) {
    return new RTIUnion(false, ...unionValues);
  }

  isOptional(): Optional {
    return this.optional;
  }

  validate(value: any): UnionValidationResult {
    throw "";
  }
}
