import { TsJestTransformer } from "ts-jest";
import { RTINumber } from "../../src/classes/primitive/RTINumber";
import { RTIString } from "../../src/classes/primitive/RTIString";
import { number, RTI, string, union } from "../../src/RTI";
import { RTIT } from "../../src/types/api-types";




describe("Union tests", () => {

	test("Whatever", () => {

		const Example = RTI.create({
			union: union(number(), string())
		});
		const validate = (rti: RTIT.ConvertToInterface<typeof Example>) => () => Example.validate(rti);
	});

});




