import { RTI } from "../RTI";
const PrimitiveInterface = RTI.parse(`
    aString: string;
    aBoolean: boolean;
    aNumber: number;
    anOptionalString?: string;
    anOptionalBoolean?: boolean;
    anOptionalNumber?: number;
`);

type IPrimitiveInterface = RTI.Interface<typeof PrimitiveInterface>;

describe("Primitive single value, single type validation", () => {
	it("Object with all fields passes validation", () => {
		const allFields: IPrimitiveInterface = {
			aString: "aString",
			aBoolean: true,
			aNumber: 5,
			anOptionalString: "anOptionalString",
			anOptionalBoolean: false,
			anOptionalNumber: -10,
		};

		expect(() => PrimitiveInterface.validate(allFields)).not.toThrow();
	});
	it("Object with only required fields passes validation", () => {
		const requiredFields: IPrimitiveInterface = {
			aString: "aString",
			aBoolean: true,
			aNumber: 5,
		};

		expect(() => PrimitiveInterface.validate(requiredFields)).not.toThrow();
	});
	it("Object with only optional fields fails validation", () => {
		const optionalFields: any = {
			anOptionalString: "anOptionalString",
			anOptionalBoolean: false,
			anOptionalNumber: -10,
		};

		expect(() => PrimitiveInterface.validate(optionalFields)).toThrow();
	});
	it("Object with all fields but wrong types fails validation", () => {
		const wrongTypes: any = {
			aString: 5,
			aBoolean: "aString",
			aNumber: true,
			anOptionalString: -10,
			anOptionalBoolean: "anOptionalString",
			anOptionalNumber: false,
		};

		expect(() => PrimitiveInterface.validate(wrongTypes)).toThrow();
	});
});

const SpecialInterface = RTI.parse(`
  anUuid: UUID;
`);

type ISpecialInterface = RTI.Interface<typeof SpecialInterface>;

describe("UUID validation", () => {

	it("UUID passes UUID validation", () => {
		const shouldPass: ISpecialInterface = {
			anUuid: RTI.UUID()
		};
		expect(() => SpecialInterface.validate(shouldPass)).not.toThrow();
	});

	it("Regular string does not pass UUID validation", () => {
		const shouldFail: ISpecialInterface = {
			anUuid: "This is not an UUID"
		};
		expect(() => SpecialInterface.validate(shouldFail)).toThrow();
	});


});