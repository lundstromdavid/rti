import { AllowedInUnion, RTIUnion } from "../RTIUnion";
import { RTIBuilder } from "./RTIBuilder";

export class RTIUnionBuilder<
  Optional extends boolean,
  T extends AllowedInUnion
> extends RTIBuilder<Optional, RTIUnion<Optional, T>> {
  readonly unionValues: T[];

  private constructor(
    private readonly optional: Optional,
    ...unionValues: T[]
  ) {
    super();
    this.unionValues = unionValues;
  }

  static optional<T extends AllowedInUnion>(...unionValues: T[]) {
    return new RTIUnionBuilder(true, ...unionValues);
  }
  static required<T extends AllowedInUnion>(...unionValues: T[]) {
    return new RTIUnionBuilder(false, ...unionValues);
  }

  // Ugly casts :(
  lock(): RTIUnion<Optional, T> {
    if (this.optional) {
      return RTIUnion.optional() as RTIUnion<Optional, T>;
    } else {
      return RTIUnion.required() as RTIUnion<Optional, T>;
    }
  }
}
