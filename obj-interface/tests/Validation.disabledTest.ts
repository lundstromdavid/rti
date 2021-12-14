import { RTI } from "../RTI";

const User = RTI.create({
	aString: RTI.string(),
	aNumber: RTI.number(),
	aBoolean: RTI.boolean(),
	"anOptionalString?": RTI.string(),
	"anOptionalNumber?": RTI.number(),
	"anOptionalBoolean?": RTI.boolean(),
});

type IUser = RTI.Interface<typeof User>;

describe("Single value primitive validation", () => {
	it("All values should pass", () => {
		const allValues: IUser = {
			aString: "aValidString",
			aNumber: 10,
			aBoolean: true,
			anOptionalString: "aValidOptionalString",
			anOptionalNumber: -15,
			anOptionalBoolean: false,
		};

		expect(() => User.validate(allValues)).not.toThrow();
	});

	it("Only required values should pass", () => {
		const onlyRequired: IUser = {
			aString: "aValidString",
			aNumber: 10,
			aBoolean: true,
		};

		expect(() => User.validate(onlyRequired)).not.toThrow();
	});

	it("Only optional values should not pass", () => {
		const onlyOptional: any = {
			anOptionalString: "aValidString",
			anOptionalNumber: 10,
			anOptionalBoolean: true,
		};

		expect(() => User.validate(onlyOptional)).toThrow();
	});
});
