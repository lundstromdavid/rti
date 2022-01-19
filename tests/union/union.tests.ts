import { number, RTI, string, union } from "../../src/RTI";
import { RTIT } from "../../src/types/api-types";

describe("Union tests", () => {
  test("Whatever", () => {
    const Example = RTI.create({
      union: union(number(), string()),
    });
    const validate = (rti: RTIT.Interface<typeof Example>) => () =>
      Example.validate(rti);
  });
});
