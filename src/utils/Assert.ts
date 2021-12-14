import { isNull } from "./NullCheck";

type Test = string | undefined | null;

type Excluded = Exclude<Test, "undefined" | "null">;

type Truthy<T> = T extends null
  ? never
  : T extends undefined
  ? never
  : T extends false
  ? never
  : T;

function assert<T>(obj: T, message?: string): Truthy<T> {

	if (isNull(obj) || !obj) {
		throw new AssertionError(message);
	}

	return obj as Truthy<T>;
}

class AssertionError extends Error {
	constructor(message?: string) {
		const msg = message || "Assertion failed.";
		super(msg);
	}
}

export default assert;
