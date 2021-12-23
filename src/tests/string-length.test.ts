import { RTI } from "../RTI";

// MIN LENGTH

test("minLength - force to be > 0", () => {

	expect(() => RTI.create({testValue: RTI.string().minLength(0)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().minLength(-1)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().minLength(-2)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().minLength(-15)})).toThrow();

})

test("minLength - single property", () => {

	const TestInterface = RTI.create({
		testValue: RTI.string().minLength(15)
	});

	expect(() => TestInterface.validate({testValue: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue: "thisIsLongEnough"})).not.toThrow();
})

test("minLength - multiple properties", () => {

	const TestInterface = RTI.create({
		testValue1: RTI.string().minLength(13),
		testValue2: RTI.string().minLength(15),
	});

	expect(() => TestInterface.validate({testValue1: "tooShort", testValue2: "alsoTooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "tooShort", testValue2: "thisIsLongEnough"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisIsLongEnough", testValue2: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisIsLongEnough", testValue2: "thisIsAlsoLongEnough"})).not.toThrow();
})

// MAX LENGTH

test("maxLength - force to be > 0", () => {

	expect(() => RTI.create({testValue: RTI.string().maxLength(0)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().maxLength(-1)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().maxLength(-2)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().maxLength(-15)})).toThrow();

})

test("maxLength - single property", () => {

	const TestInterface = RTI.create({
		testValue: RTI.string().maxLength(12)
	});

	expect(() => TestInterface.validate({testValue: "thisIsTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue: "notTooLong"})).not.toThrow();
})

test("maxLength - multiple properties", () => {

	const TestInterface = RTI.create({
		testValue1: RTI.string().maxLength(10),
		testValue2: RTI.string().maxLength(12),
	});

	expect(() => TestInterface.validate({testValue1: "thisIsTooLong", testValue2: "thisIsAlsoTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "notTooLong", testValue2: "thisIsTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisIsTooLong", testValue2: "notTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "notTooLong", testValue2: "alsoFine"})).not.toThrow();
})

// LENGTH IN RANGE

test("lengthInRange - min length lower than max", () => {

	expect(() => RTI.create({testValue: RTI.string().lengthInRange(5, 5)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().lengthInRange(5, 4)})).toThrow();
	expect(() => RTI.create({testValue: RTI.string().lengthInRange(5, 6)})).not.toThrow();

})

test("lengthInRange - single property", () => {
	const TestInterface = RTI.create({
		testValue: RTI.string().lengthInRange(10, 15)
	});

	expect(() => TestInterface.validate({testValue: "thisStringIsTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue: "thisOneIsFine"})).not.toThrow();
})

test("lengthInRange - multiple properties", () => {
	const TestInterface = RTI.create({
		testValue1: RTI.string().lengthInRange(10, 20),
		testValue2: RTI.string().lengthInRange(12, 18),
	});

	expect(() => TestInterface.validate({testValue1: "thisStringIsTooLongToPass", testValue2: "thisStringIsAlsoTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisStringIsFine", testValue2: "thisStringIsStillTooLong"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisStringIsFine", testValue2: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisStringIsTooLongToPass", testValue2: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "tooShort", testValue2: "tooShort"})).toThrow();
	expect(() => TestInterface.validate({testValue1: "thisStringIsFine", testValue2: "thisIsAlsoFine"})).not.toThrow();

})

/* // Make sure properties gets removed properly

test("length property removal", () => {
	
	const properties = ["maxLength", "minLength", "lengthInRange"];
	const baseString = RTI.string();

	properties.forEach(prop => expect(baseString).toHaveProperty(prop));
	
	const stringWithMinLength = RTI.string().minLength(15);
	const stringWithMaxLength = RTI.string().maxLength(15);
	const stringWithLengthInRange = RTI.string().lengthInRange(15, 16);
	
	properties.forEach(prop => expect(stringWithMinLength).not.toHaveProperty(prop));
	properties.forEach(prop => expect(stringWithMaxLength).not.toHaveProperty(prop));
	properties.forEach(prop => expect(stringWithLengthInRange).not.toHaveProperty(prop));

})
 */