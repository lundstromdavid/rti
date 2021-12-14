import { RTICustomStringTypes } from "../custom-types/RTIStringTypes";
import { ParsedInterfaceV2 } from "../RTI";
export type TypeFromString<T extends string> =
  T extends `${infer Pre}{${infer NestedProperties}}[]${infer Post}`
    ? ParsedInterfaceV2<NestedProperties>[]
    : T extends `${infer Pre}{${infer NestedProperties}}${infer Post}`
    ? ParsedInterfaceV2<NestedProperties>
    : T extends `${infer First}|${infer Rest}`
    ? _TypeFromString<First> | TypeFromString<Rest>
    : _TypeFromString<T>;

export type _TypeFromString<T extends string> = T extends `${infer Type}[]`
  ? _SingleType<Type>[]
  : _SingleType<T>;

type _SingleType<T extends string> = T extends "string"
  ? string
  : T extends RTICustomStringTypes
  ? string
  : T extends "number"
  ? number
  : T extends "boolean"
  ? boolean
  : T extends "true"
  ? true
  : T extends "false"
  ? false
  : never;
