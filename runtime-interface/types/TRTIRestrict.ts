export type RTIRestrictions<T> = T extends string
  ? StringRestrict
  : T extends number
  ? NumberRestrict
  : never;

type StringRestrict<T extends Partial<StringRestrict> = {}> = Omit<
  StringLengthRestrict<T> & StringContainsRestrict<T>,
  keyof T
>;

type StringLengthRestrict<T extends Partial<StringRestrict>> = {
  minLength(length: number): StringRestrict<T & StringLengthRestrict<T>>;
  maxLength(length: number): StringRestrict<T & StringLengthRestrict<T>>;
  lengthInRange(
    min: number,
    max: number
  ): StringRestrict<T & StringLengthRestrict<T>>;
};

type StringContainsRestrict<T extends Partial<StringRestrict>> = {
  contains(value: string): StringRestrict<T & StringContainsRestrict<T>>;
};

type NumberRestrict<T extends Partial<NumberRestrict> = {}> = Omit<
  NumberValueRestrict,
  keyof T
>;

type NumberValueRestrict<T extends Partial<NumberRestrict> = {}> = {
  minValue(value: number): NumberRestrict<T & NumberValueRestrict<T>>;
  maxValue(value: number): NumberRestrict<T & NumberValueRestrict<T>>;
  valueInRange(
    min: number,
    max: number
  ): NumberRestrict<T & NumberValueRestrict<T>>;
};
