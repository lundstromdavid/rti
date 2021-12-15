import { RTIString } from "../object-types/RTIString";
import { RTIBool } from "../object-types/RTIBool";
import { RTINumber } from "../object-types/RTINumber";

export type SinglePrimitiveRTIObject = RTIBool | RTINumber | RTIString;
export type TRTIObject = SinglePrimitiveRTIObject;