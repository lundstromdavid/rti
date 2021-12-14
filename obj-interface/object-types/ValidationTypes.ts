type RTIUnchecked = "unchecked";

export type RTIStringValidation = {
    type: "RTIString",
    passed: boolean;
    longEnough: boolean | RTIUnchecked; 
    notTooLong: boolean | RTIUnchecked;
    // Need to establish and/or relation
    containsAllProvidedValues: boolean | RTIUnchecked;
}

export type RTINumberValidation = {
    type: "RTINumber",
    passed: boolean;
    bigEnough: boolean | RTIUnchecked; 
    notTooBig: boolean | RTIUnchecked;
    passedIntegerCheck: boolean | RTIUnchecked;
}

export type RTIBooleanValidation = {
    type: "RTIBoolean",
    passed: boolean;
}

export type TRTIValidation = RTIStringValidation | RTINumberValidation | RTIBooleanValidation;