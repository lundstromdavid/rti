import { RTI } from "../RTI";




test("minLength", () => {

	const TestInterface = RTI.create({
		testValue: RTI.string().minLength(15)
	});

	expect(() => TestInterface.validate({testValue: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue: "thisIsLongEnough"})).not.toThrow();
})

