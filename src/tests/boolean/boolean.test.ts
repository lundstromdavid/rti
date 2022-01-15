import { boolean, RTI } from "../../RTI";



describe("RTI boolean tests", () => {


	test("Only booleans pass", () => {

		const Example = RTI.create({
			bool: boolean()
		});

		expect(() => Example.validate({bool: true})).not.toThrow();
		expect(() => Example.validate({bool: false})).not.toThrow();
		
		expect(() => Example.validate({bool: 0})).toThrow();
		expect(() => Example.validate({bool: []})).toThrow();
		expect(() => Example.validate({bool: ""})).toThrow();
		expect(() => Example.validate({bool: {}})).toThrow();

	});



})