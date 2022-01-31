import {
  boolean,
  number,
  numericLiteral,
  RTI,
  string,
  stringLiteral,
  union,
} from "../../src/RTI";
import { RTIT } from "../../src/types/api-types";

describe("Union tests", () => {
  test("Test simple union types - allow numbers and strings", () => {
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
  test("Test simple union types - allow booleans, string- and numberi-literals", () => {
    const Example = RTI.create({
      union: union(
        boolean(),
        stringLiteral("test1", "test2"),
        numericLiteral(-3, 10)
      ),
    });
    const validate = (rti: RTIT.Interface<typeof Example>) => () =>
      Example.validate(rti);

    expect(validate({ union: "test1" })).not.toThrow();
    expect(validate({ union: "test2" })).not.toThrow();
    expect(validate({ union: true })).not.toThrow();
    expect(validate({ union: false })).not.toThrow();
    expect(validate({ union: -3 })).not.toThrow();
    expect(validate({ union: 10 })).not.toThrow();

    expect(validate({ union: "a string" as any })).toThrow();
    expect(validate({ union: 5 as any })).toThrow();
  });
  test("Restricted union types - only allow strings of different types", () => {
    const Example = RTI.create({
      union: union(
        string().lengthInRange(2, 5),
        string().lengthInRange(10, 15)
      ),
    });
    const validate = (rti: RTIT.Interface<typeof Example>) => () =>
      Example.validate(rti);

    expect(validate({ union: "is<5" })).not.toThrow();
    expect(validate({ union: "between10&15" })).not.toThrow();
    expect(validate({ union: "5<this<10" })).toThrow();
  });
  test("Disallow nested unions", () => {
    expect(() =>
      RTI.create({
        union: union(
          union(string(), number()) as any,
          union(boolean(), stringLiteral("this doesnt matter")) as any
        ),
      })
    ).toThrow();
  });
  test("Disallow only one value", () => {
    expect(() =>
      RTI.create({
        //@ts-ignore
        union: union(string()),
      })
    ).toThrow();
  });
});
