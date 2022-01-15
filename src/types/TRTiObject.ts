import { RTIString } from "../object-types/primitive/RTIString";
import { RTIBool } from "../object-types/primitive/RTIBool";
import { RTINumber } from "../object-types/primitive/RTINumber";
import { RTINumericLiteral } from "../object-types/primitive/RTINumericLiteral";

export type SinglePrimitiveRTIObject = RTIBool | RTINumber | RTIString | RTINumericLiteral<any>;
export type TRTIObject = SinglePrimitiveRTIObject;