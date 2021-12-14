
export const RTIUnchecked: TRTIUnchecked = "unchecked";
export type TRTIUnchecked = "unchecked";

type CorrectType<Expected extends string> = true | {
    expected: Expected;
    actual: string;
};


export type RTIStringValidation = {
    discriminator: "RTIString",
    passed: boolean;
    correctType: CorrectType<"string">;
    longEnough: boolean | TRTIUnchecked; 
    notTooLong: boolean | TRTIUnchecked;
    // Need to establish and/or relation
    containsAllProvidedValues: boolean | TRTIUnchecked;
}

export type RTINumberValidation = {
    discriminator: "RTINumber";
    passed: boolean;
    correctType: CorrectType<"number">;
    bigEnough: boolean | TRTIUnchecked; 
    notTooBig: boolean | TRTIUnchecked;
    passedIntegerCheck: boolean | TRTIUnchecked;
}

export type RTIBooleanValidation = {
    discriminator: "RTIBoolean";
    correctType: CorrectType<"boolean">;
    passed: boolean;
}

export type TRTIValidation = RTIStringValidation | RTINumberValidation | RTIBooleanValidation;