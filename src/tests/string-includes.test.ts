import { RTI } from "../RTI";
import { RTICase } from "../types/RTICase";

test("includes all - case sensitive", () => {
  const shouldInclude = ["some", "test", "words"];

  const rti = RTI.create({
    testStringImplicit: RTI.string().includesAll(shouldInclude),
    testStringExplicit: RTI.string().includesAll(
      shouldInclude,
      RTICase.sensitive
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
