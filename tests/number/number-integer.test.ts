import { number, RTI } from "../../src/RTI";



describe("RTI number min max test", () => {

	test("Integer enforcing", () => {
		const Example = RTI.create({
			integer: number().integer()
		});
	
		const validate = (rti: RTI.ConvertToInterface<typeof Example>) => () => Example.validate(rti); 
	
		expect(validate({
			integer: 0
		})).not.toThrow();
		expect(validate({
			integer: 1
		})).not.toThrow();
		expect(validate({
			integer: -1
		})).not.toThrow();
		expect(validate({
			integer: 500
		})).not.toThrow();
		expect(validate({
			integer: -12345
		})).not.toThrow();
	
		expect(validate({
			integer: 0.5
		})).toThrow();
		expect(validate({
			integer: 1.1
		})).toThrow();
		expect(validate({
			integer: -1.2
		})).toThrow();
		expect(validate({
			integer: 500.4
		})).toThrow();
		expect(validate({
			integer: -12345.7
		})).toThrow();
	})


});