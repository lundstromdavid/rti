export type TEntries<T extends object> = {
	[K in keyof T]: [K, T[K]];
  }[keyof T][];
  

export namespace MUtils {

	export function asArray<T>(value: T | T[]): T[] {
		return ([] as T[]).concat(value);
	}
  
	export function intersection(a1: any[], a2: any[]) {
		return a1.filter((value) => a2.includes(value));
	}

	export function entries<T extends object>(obj: T): TEntries<T> {
		return Object.entries(obj) as TEntries<T>;
	}

}