import { RTIT } from "../../types/api-types";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class BooleanValidationResult implements RTIT.IBooleanValidation {
  public readonly passed: boolean;
  public readonly discriminator: "boolean";
  public readonly typeCheck: RTIT.TypeCheck<boolean>;

  constructor(value: any) {
    const { passedBaseTest, typeCheck } =
      new PrimitiveValidator<boolean>(value, "boolean");
	  this.passed = passedBaseTest;
	  this.typeCheck = typeCheck;
  }
}
