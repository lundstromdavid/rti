import { RTIOptionalBool } from "../../object-types/RTIOptionalBool";
import { RTIOptionalNumber } from "../../object-types/RTIOptionalNumber";
import { RTIOptionalString } from "../../object-types/RTIOptionalString";
import { RTI } from "../../RTI";
const {number, optional} = RTI;

const Example = RTI.create({
	value1: optional.number.min(-50),
	value2: optional.number.min(0),
	value3: optional.number.min(500),
	value4: optional.string.min(5),
});

type TExample = typeof Example;

type TOptional = RTIOptionalBool | RTIOptionalNumber | RTIOptionalString;
type Optional = RTIOptionalNumber;
type Test = Optional extends TOptional ? true : false;


describe("RTI number min max test", () => {

	test("Min value", () => {

		const example = RTI.create({
			value1: optional.number.min(-50),
			value2: optional.number.min(0),
			value3: optional.number.min(500)
		});

		const validate = (rti: RTI.ConvertToInterface<typeof example>) => example.validate(rti); 

		//expect(() => validate({})).toThrow();

	});

});