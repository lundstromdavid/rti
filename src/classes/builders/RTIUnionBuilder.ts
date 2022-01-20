import assert from "../../utils/Assert";
import { RTIClass } from "../RTIClass";
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
    this.assertValidValues();
  }

  static optional<T extends AllowedInUnion>(...unionValues: T[]) {
    return new RTIUnionBuilder(true, ...unionValues);
  }
  static required<T extends AllowedInUnion>(...unionValues: T[]) {
    return new RTIUnionBuilder(false, ...unionValues);
  }

  private assertValidValues() {
    this.unionValues.forEach(
      (val) => assert(val instanceof RTIClass && !(val instanceof RTIUnion)),
      "Only non union RTI classes allowed"
    );
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
