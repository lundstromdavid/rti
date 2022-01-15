import { IBooleanValidation, TTypeCheck } from "../ValidationTypes";
import { PrimitiveValidator } from "./PrimitiveValidator";

export class BooleanValidationResult implements IBooleanValidation {
  public readonly passed: boolean;
  public readonly discriminator: "boolean";
  public readonly typeCheck: TTypeCheck<boolean>;

  constructor(value: any) {
    const { passedBaseTest, typeCheck } =
      new PrimitiveValidator<boolean>(value, "boolean");
	  this.passed = passedBaseTest;
	  this.typeCheck = typeCheck;
  }
}
