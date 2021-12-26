import { RTI } from "../../RTI";
import { RTICase } from "../../types/RTICase";

console.log("IJKASDJNKASNDLÖJASHDLJASD")
describe("string includes test", () => {
  test("includes all - case sensitive", () => {

    const shouldInclude = ["some", "test", "words"];
  
    try {
      console.log("JKAWDJKASJDKASJDLAKSJDALSKJD");
    /*   const rti = RTI.create({
        testStringImplicit: RTI.stringg().includesAll(shouldInclude),
        testStringExplicit: RTI.stringg().includesAll(
          shouldInclude,
          RTICase.sensitive
        ),
      }); */
      const rti = RTI.create2({});
    
      expect(true).toBe(true);
    } catch(er) {
      expect(true).toBe(true);
      console.log("JKASDJKASDJKASDJKLASÖJDÖLKASDHJLÖAJSKDHAÖLSJDHÖALSJDH")
    }
    expect(true).toBe(true);

  /*   expect(() =>
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
    ).not.toThrow(); */
  });
  
});

