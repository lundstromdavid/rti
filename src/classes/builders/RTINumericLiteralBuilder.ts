import { RTINumericLiteral } from "../primitive/RTINumericLiteral";
import { RTIBuilder } from "./RTIBuilder";

export class RTINumericLiteralBuilder<
  Optional extends boolean,
  T extends number
> extends RTIBuilder<Optional, RTINumericLiteral<Optional, T>> {
	
  private readonly allowedValues: T[];

  constructor(private readonly optional: Optional, ...allowedValues: T[]) {
    super();
    this.allowedValues = allowedValues;

    this.confirmOnlyNumbers();
    this.confirmNoDuplicates();
  }

  static required<T extends number>(...allowedValues: T[]) {
    return new RTINumericLiteralBuilder<false, T>(false, ...allowedValues);
  }

  static optional<T extends number>(...allowedValues: T[]) {
    return new RTINumericLiteralBuilder<true, T>(true, ...allowedValues);
  }

  private confirmOnlyNumbers() {
    if (this.allowedValues.some((num) => typeof num !== "number")) {
      throw new Error(
        "Non numerical values passed into the numerical literal constructor (This error/exception should be more specific later)"
      );
    }
  }

  private confirmNoDuplicates() {
    if (
      this.allowedValues.some(
        (num, index) => this.allowedValues.indexOf(num) !== index
      )
    ) {
      throw new Error(
        "Duplicate numberical values passed into the numerical literal constructor (This error/exception should be more specific later)"
      );
    }
  }

  // Ugly casts :'(
  lock(): RTINumericLiteral<Optional, T> {
	  if (this.optional) {
		  return RTINumericLiteral.optional(...this.allowedValues) as RTINumericLiteral<Optional, T>;
		} else {
		  return RTINumericLiteral.required(...this.allowedValues) as RTINumericLiteral<Optional, T>;
	  }
  }
}
