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
    assert(
      this.unionValues.length > 1,
      "Unions with only one value does not make any sense"
    );
    this.unionValues.forEach((val) => {
      const isClass = val instanceof RTIClass && !(val instanceof RTIUnion);
      const isBuilder =
        val instanceof RTIBuilder && !(val instanceof RTIUnionBuilder);
      assert(
        isClass || isBuilder,
        "Only non union RTI values allowed in a union"
      );
    }, "Only non union RTI classes allowed");
  }

  // Ugly casts :(
  lock(): RTIUnion<Optional, T> {
    if (this.optional) {
      return RTIUnion.optional(...this.unionValues) as RTIUnion<Optional, T>;
    } else {
      return RTIUnion.required(...this.unionValues) as RTIUnion<Optional, T>;
    }
  }
}
