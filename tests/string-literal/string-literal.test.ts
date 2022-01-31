import {  RTI, stringLiteral } from "../../src/RTI";
import { RTIMap, RTIT } from "../../src/types/api-types";


describe("RTI string literal tests", () => {

	test("String literals validate properly", () => {


		const Example = RTI.create({
			stringLiteral: stringLiteral("allowed", "also allowed", "test"),
		});

		const validate = (rti: RTIT.Interface<typeof Example>) => () => Example.validate(rti); 

		expect(validate({stringLiteral: "allowed"})).not.toThrow();
		expect(validate({stringLiteral: "also allowed"})).not.toThrow();
		expect(validate({stringLiteral: "test"})).not.toThrow();

		expect(validate({stringLiteral: "not allowed"} as any)).toThrow();
		expect(validate({stringLiteral: "ajskdjaskdjaskdjasd"} as any)).toThrow();
		expect(validate({stringLiteral: "testt"} as any)).toThrow();

	})

	test("Duplicates not allowed", () => {

		expect(() => RTI.create({
			stringLiteral: stringLiteral("test", "test")
		})).toThrow();

		expect(() => RTI.create({
			stringLiteral: stringLiteral("duplicate", "single", "duplicate")
		})).toThrow();

		expect(() => RTI.create({
			stringLiteral: stringLiteral("alone", "not alone", "not alone")
		})).toThrow();

	});

	test("Non-string values not allowed", () => {

		expect(() => RTI.create({
			stringLiteral: stringLiteral("", 5 as any)
		})).toThrow();

		expect(() => RTI.create({
			stringLiteral: stringLiteral("", true as any)
		})).toThrow();

		expect(() => RTI.create({
			stringLiteral: stringLiteral("", [] as any)
		})).toThrow();

		expect(() => RTI.create({
			stringLiteral: stringLiteral("", undefined as any)
		})).toThrow();

		expect(() => RTI.create({
			stringLiteral: stringLiteral("", null as any)
		})).toThrow();

	});

})