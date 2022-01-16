import { RTI } from "../../src/RTI";
const {optional} = RTI;


describe("RTI number min max test", () => {

	test("Min value", () => {

		const Example = RTI.create({
			negative: optional.number.min(-50),
			zero: optional.number.min(0),
			positive: optional.number.min(500)
		});

		const validate = (rti: RTI.ConvertToInterface<typeof Example>) => () => Example.validate(rti); 
		
		// Negative
		expect(validate({
			negative: -51 
		})).toThrow();
		
		expect(validate({
			negative: -100 
		})).toThrow();

		expect(validate({
			negative: -50 
		})).not.toThrow();

		expect(validate({
			negative: 12345
		})).not.toThrow();

		// Zero
		expect(validate({
			zero: -1
		})).toThrow();

		expect(validate({
			zero: 0
		})).not.toThrow();

		expect(validate({
			zero: 1
		})).not.toThrow();

		// Positive
		expect(validate({
			positive: 450
		})).toThrow();

		expect(validate({
			positive: 500
		})).not.toThrow();

		expect(validate({
			positive: 54321
		})).not.toThrow();

	});

	test("Max value", () => {

		const Example = RTI.create({
			negative: optional.number.max(-50),
			zero: optional.number.max(0),
			positive: optional.number.max(500)
		});

		const validate = (rti: RTI.ConvertToInterface<typeof Example>) => () => Example.validate(rti); 
		
		// Negative
		expect(validate({
			negative: -51 
		})).not.toThrow();
		
		expect(validate({
			negative: -100 
		})).not.toThrow();

		expect(validate({
			negative: -50 
		})).not.toThrow();

		expect(validate({
			negative: -49 
		})).toThrow();

		expect(validate({
			negative: 12345
		})).toThrow();

		// Zero
		expect(validate({
			zero: -1
		})).not.toThrow();

		expect(validate({
			zero: 0
		})).not.toThrow();

		expect(validate({
			zero: 1
		})).toThrow();

		// Positive
		expect(validate({
			positive: 450
		})).not.toThrow();

		expect(validate({
			positive: 500
		})).not.toThrow();

		expect(validate({
			positive: 501
		})).toThrow();

		expect(validate({
			positive: 54321
		})).toThrow();

	});

});