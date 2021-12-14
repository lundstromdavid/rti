import { RTIOptional, RTIRequired, RTIPrimitiveType, RTIType } from "./RTIType";
import { ParsedInterfaceV2 } from "./RTI";

export type RTIRuntimeObject<T extends string> = {
  [key in keyof ParsedInterfaceV2<T>]: RTIOptional[] | RTIRequired[];
};

export class RTIRuntimeObjectBuilder<T extends string> {
	constructor(readonly str: T) {}

	public build(): RTIRuntimeObject<T> {
		const str = this.str;

		const rows = str.split(";");

		const obj: { [key: string]: any[] } = {};

		rows.forEach((row) => {
			const [untrimmedKey, type] = row.split(":");

			if (!untrimmedKey || !type) {
				return;
			}

			let key = untrimmedKey.trim();
			const optional = key.endsWith("?");

			if (optional) {
				key = key.slice(0, -1);
			}

			const types = type.split("|");

			const values = types.map((type) =>
				this.getObjectValueFromType(type.trim(), optional)
			);

			obj[key] = values;
		});

		return obj as { [key in keyof ParsedInterfaceV2<T>]: any[] };
	}

	private isUuidType(str: string) {
		return str.startsWith("UUID");
	}


	private getObjectValueFromType(
		str: string,
		optional: boolean
	): RTIOptional | RTIRequired {
		const isArray = str.endsWith("[]");


		if (this.isUuidType(str)) {
			return RTIType.create("UUID", optional);
		}

		else if (str.startsWith("string"))
			return RTIType.create(isArray ? "stringArray" : "string", optional);
		else if (str.startsWith("number"))
			return RTIType.create(isArray ? "numberArray" : "number", optional);
		else if (str.startsWith("boolean"))
			return RTIType.create(isArray ? "booleanArray" : "boolean", optional);

		throw new Error("Unsupported type");
	}
}
