import { RTIBool } from "../primitive/RTIBool";
import { RTIBuilder } from "./RTIBuilder";

export class RTIBoolBuilder<Optional extends boolean> extends RTIBuilder<Optional, RTIBool<Optional>> {
  
  private readonly type = "boolBuilder";

  private constructor(private readonly optional: Optional) {
    super();
  }

  static required() {
    return new RTIBoolBuilder(false);
  }

  static optional() {
    return new RTIBoolBuilder(true);
  }

  // Ugly casts :'(
  lock(): RTIBool<Optional> {
    if (this.optional) {
      return RTIBool.optional() as RTIBool<Optional>;
    } else {
      return RTIBool.required() as RTIBool<Optional>;
    }
  }

  
}
