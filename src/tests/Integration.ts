import { RTI } from "../RTI";

const User = RTI.create({
	id: RTI.string,
	username: RTI.string.range(8, 25), 
	password: RTI.string.range(8, 25),
	email: RTI.string,
	age: RTI.number,
	subscribesToNewsletter: RTI.optional.boolean,
});

type TUser = typeof User;
type IUser = RTI.ConvertToInterface<TUser>;


const mockNetworkData: IUser = {
	id: "this is not an id",
	username: "illle",
	password: "x6198ekasdj",
	email: "david@lundstrom.eu",
	age: 25,
	subscribesToNewsletter: true
};
/* 
const {validated, error } = User.validateSafely(mockNetworkData);

if (validated) {
	error;
	validated;
} else {
	error;
}
 */