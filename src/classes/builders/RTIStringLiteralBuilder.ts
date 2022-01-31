import { RTIStringLiteral } from "../primitive/RTIStringLiteral";
import { RTIBuilder } from "./RTIBuilder";

export class RTIStringLiteralBuilder<
  Optional extends boolean,
  T extends string
> extends RTIBuilder<Optional, RTIStringLiteral<Optional, T>> {
  private readonly allowedValues: T[];

  constructor(private readonly optional: Optional, ...allowedValues: T[]) {
    super();
    this.allowedValues = allowedValues;
    this.confirmOnlyString();
    this.confirmNoDuplicates();
  }

  static required<T extends string>(...allowedValues: T[]) {
    return new RTIStringLiteralBuilder<false, T>(false, ...allowedValues);
  }

  static optional<T extends string>(...allowedValues: T[]) {
    return new RTIStringLiteralBuilder<true, T>(true, ...allowedValues);
  }

  private confirmOnlyString() {
    if (this.allowedValues.some((num) => typeof num !== "string")) {
      throw new Error(
        "Non string values passed into the numerical literal constructor (This error/exception should be more specific later)"
      );
    }
  }

  private confirmNoDuplicates() {
    if (
      this.allowedValues.some(
        (str, index) => this.allowedValues.indexOf(str) !== index
      )
    ) {
      throw new Error(
        "Duplicate string values passed into the numerical literal constructor (This error/exception should be more specific later)"
      );
    }
  }

  lock(): RTIStringLiteral<Optional, T> {
    if (this.optional) {
      return RTIStringLiteral.optional(
        ...this.allowedValues
      ) as RTIStringLiteral<Optional, T>;
    } else {
      return RTIStringLiteral.required(
        ...this.allowedValues
      ) as RTIStringLiteral<Optional, T>;
    }
  }
}
