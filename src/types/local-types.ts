export type TPrimitive = string | number | boolean;
export type TPrimitiveToString<T extends TPrimitive> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : "boolean";