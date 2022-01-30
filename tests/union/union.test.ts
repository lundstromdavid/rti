import { number, RTI, string, union } from "../../src/RTI";
import { RTIT } from "../../src/types/api-types";

describe("Union tests", () => {
  test("Test simple union types", () => {
    const Example = RTI.create({
      union: union(number(), string()),
    });
    const validate = (rti: RTIT.Interface<typeof Example>) => () =>
      Example.validate(rti);

    expect(validate({ union: "a string" })).not.toThrow();
    expect(validate({ union: 5 })).not.toThrow();
    expect(validate({ union: true as any })).toThrow();
    expect(validate({ union: [] as any })).toThrow();
    expect(validate({ union: {} as any })).toThrow();
    expect(validate({ union: null as any })).toThrow();
    expect(validate({ union: undefined as any })).toThrow();
  });
});
