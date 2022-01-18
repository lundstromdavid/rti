import { RTI } from "../../src/RTI";
import { RTIT } from "../../src/types/api-types";

describe("RTI string includes functionality", () => {
  test("includes all - case sensitive", () => {
    const shouldInclude = ["some", "test", "words"];

    const rti = RTI.create({
      testStringImplicit: RTI.string.includesAll(shouldInclude),
      testStringExplicit: RTI.string.includesAll(
        shouldInclude,
        RTIT.Case.sensitive
      ),
    });

    expect(() =>
      rti.validate({
        testStringImplicit: "some test word",
        testStringExplicit: "some test word",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testStringImplicit: "some words",
        testStringExplicit: "some words",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testStringImplicit: "some tEst words",
        testStringExplicit: "some tEst words",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testStringImplicit: "soMetestwords",
        testStringExplicit: "soMetestwords",
      })
    ).toThrow();
    expect(() =>
      rti.validate({
        testStringImplicit: "some test words",
        testStringExplicit: "some test words",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testStringImplicit: "sometestwords",
        testStringExplicit: "sometestwords",
      })
    ).not.toThrow();
    expect(() =>
      rti.validate({
        testStringImplicit: "testsomewords",
        testStringExplicit: "testsomewords",
      })
    ).not.toThrow();
  });

  test("includes all - case insensitive", () => {
    const shouldInclude = ["some", "test", "words"];

    const rti = RTI.create({
      testString: RTI.string.includesAll(shouldInclude, RTIT.Case.insensitive),
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
