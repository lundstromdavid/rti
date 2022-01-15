import { RTINumericLiteral } from "../../object-types/primitive/RTINumericLiteral";
import { numericLiteral, RTI } from "../../RTI"


describe("RTI numeric literal tests", () => {

	test("Numeric literals validate properly", () => {


		const Example = RTI.create({
			numLiteral: numericLiteral(20, 25.3, -28.2),
		});

		const validate = (rti: RTI.ConvertToInterface<typeof Example>) => () => Example.validate(rti); 

		expect(validate({numLiteral: 20})).not.toThrow();
		expect(validate({numLiteral: 25.3})).not.toThrow();
		expect(validate({numLiteral: -28.2})).not.toThrow();

		expect(validate({numLiteral: -3} as any)).toThrow();
		expect(validate({numLiteral: 5} as any)).toThrow();
		expect(validate({numLiteral: 150} as any)).toThrow();

	})

	test("Duplicates not allowed", () => {

		expect(() => RTI.create({
			numLiteral: numericLiteral(5, 5)
		})).toThrow();

		expect(() => RTI.create({
			numLiteral: numericLiteral(10, 2, 10)
		})).toThrow();

		expect(() => RTI.create({
			numLiteral: numericLiteral(10, -8, -8)
		})).toThrow();

	});

	test("Non-numbers values not allowed", () => {

		expect(() => RTI.create({
			numLiteral: numericLiteral(5, "" as any)
		})).toThrow();

		expect(() => RTI.create({
			numLiteral: numericLiteral(10, true as any)
		})).toThrow();

		expect(() => RTI.create({
			numLiteral: numericLiteral(10, [] as any)
		})).toThrow();

		expect(() => RTI.create({
			numLiteral: numericLiteral(10, undefined)
		})).toThrow();

		expect(() => RTI.create({
			numLiteral: numericLiteral(10, null)
		})).toThrow();

	});

})