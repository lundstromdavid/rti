type TNotNull<T> = Exclude<T, undefined | null>;

export function notNull<T>(obj: T): obj is TNotNull<T> {
  const type = typeof obj;
  if (type === "boolean") return true;
  if (type === "number") return true;
  if (type === "string") return true;
  return !!obj;
}

export function isNull<T>(obj: T | null | undefined): obj is null | undefined {
  return !notNull(obj);
}
