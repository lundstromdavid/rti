import assert from "../utils/Assert";
import { UnionValidationResult } from "../validation/UnionValidationResult";
import { ValidationTypes } from "../validation/ValidationHelper";
import { RTIBuilder } from "./builders/RTIBuilder";
import { RTIClass } from "./RTIClass";

export type AllExceptUnion = Exclude<
  ValidationTypes.All,
  UnionValidationResult<any>
>;
export type AllowedInUnion =
  | RTIClass<AllExceptUnion, any>
  | RTIBuilder<any, RTIClass<AllExceptUnion, any>>;

export class RTIUnion<
  Optional extends boolean,
  T extends AllowedInUnion
> extends RTIClass<UnionValidationResult<any>, Optional> {
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

  // In builder, but I'm not sure it should be
  /* private assertValidValues() {
    this.unionValues.forEach(
      (val) => assert(val instanceof RTIClass && !(val instanceof RTIUnion)),
      "Only non union RTI classes allowed"
    );
  } */

  isOptional(): Optional {
    return this.optional;
  }

  validate(value: any): UnionValidationResult<T> {
    return new UnionValidationResult(value, this.unionValues);
  }
}
