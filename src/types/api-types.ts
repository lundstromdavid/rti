import { IOptional } from "../classes/optionals/IOptional";
import { RTIBool } from "../classes/primitive/RTIBool";
import { RTINumber } from "../classes/primitive/RTINumber";
import { RTINumericLiteral } from "../classes/primitive/RTINumericLiteral";
import { RTIString } from "../classes/primitive/RTIString";
import { RTIStringLiteral } from "../classes/primitive/RTIStringLiteral";
import { RTIClass } from "../classes/RTIClass";
import { RTI } from "../RTI";

export namespace RTIType {
	export type Schema = Record<string | number | symbol, RTIClass<any>>;

	export type ConvertToInterface<T extends RTI<any>> = T extends RTI<infer U>
    ? Omit<
        {
          [key in keyof U as Required<U, key>]: RTIToPrimitive<U[key]>;
        } & {
          [key in keyof U as Optional<U, key>]?: RTIToPrimitive<U[key]>;
        },
        ""
      >
    : never;

  type Required<R extends Schema, K extends keyof R> = R[K] extends IOptional
    ? never
    : K;
  type Optional<R extends Schema, K extends keyof R> = R[K] extends IOptional
    ? K
    : never;

	type RTIToPrimitive<T> = T extends RTIString
    ? string
    : T extends RTIStringLiteral<infer Strings>
    ? Strings
    : T extends RTIBool
    ? boolean
    : T extends RTINumber
    ? number
    : T extends RTINumericLiteral<infer Numbers>
    ? Numbers
    : never;


	// Not a type, clearly
	export enum Case {
		sensitive,
		insensitive,
	}
}
