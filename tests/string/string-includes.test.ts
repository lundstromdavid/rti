import { RTI, string } from "../../src/RTI";
import { RTIT } from "../../src/types/api-types";

describe("RTI string includes functionality", () => {
  test("includes all - case sensitive", () => {
    const shouldInclude = ["some", "test", "words"];

    const rti = RTI.create({
      testString: string().includesAll(shouldInclude),
    });

    expect(() =>
      rti.validate({
        testString: "some test word",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testString: "some words",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testString: "some tEst words",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testString: "soMetestwords",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testString: "some test words",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testString: "sometestwords",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testString: "testsomewords",
      })
    ).not.toThrow();
  });

  test("includes all - case insensitive", () => {
    const shouldInclude = ["some", "test", "words"];

    const rti = RTI.create({
      testString: string().includesAllCaseInsensitive(shouldInclude),
    });

    expect(() =>
      rti.validate({
        testString: "some test word",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testString: "some words",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testString: "some tEst words",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testString: "soMetestwords",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testString: "some test words",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testString: "sometestwords",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testString: "testsomewords",
      })
    ).not.toThrow();
  });
});
