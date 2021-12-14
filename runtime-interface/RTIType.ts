import { RTIRuntimeObject } from "./RTIRuntimeObjectBuilder";
export namespace RTIType {
  export function isOptional<S extends string, T extends RTIRuntimeObject<S>>(
  	obj: T,
  	key: keyof T
  ) {
  	const firstValue = obj[key][0];

  	return firstValue instanceof RTIOptional;
  }

  export function isRequired<S extends string, T extends RTIRuntimeObject<S>>(
  	obj: T,
  	key: keyof T
  ) {
  	return !RTIType.isOptional(obj, key);
  }

  export function create(
  	_type: RTIType,
  	optional: boolean
  ): RTIOptional | RTIRequired {
  	if (optional) {
  		return new RTIOptional(_type);
  	} else {
  		return new RTIRequired(_type);
  	}
  }
}

export type RTIPrimitiveType =
  | "string"
  | "number"
  | "boolean"
  | "stringArray"
  | "numberArray"
  | "booleanArray";


export type RTICustomType = "UUID";

export type RTIType = RTIPrimitiveType | RTICustomType;

abstract class RTIAbstract {
	constructor(readonly _type: RTIType) {}

	getType() {
		switch (this._type) {
		case "string":
		case "stringArray":
			return "string";
		case "number":
		case "numberArray":
			return "number";
		case "boolean":
		case "booleanArray":
			return "boolean";
		default:
			return this._type;
		}
	}

	isArray() {
		return this._type.endsWith("Array");
	}
}
export class RTIOptional extends RTIAbstract {}
export class RTIRequired extends RTIAbstract {}
