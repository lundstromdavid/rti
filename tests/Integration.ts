import { number, optional, RTI, string } from "../src/RTI";
import { RTIT } from "../src/types/api-types";


const User = RTI.create({
	id: string(),
	username: string().maxLength(5), 
	password: string().maxLength(15),
	email: string(),
	age: number(),
	subscribesToNewsletter: optional.boolean(),
});

type TUser = typeof User;
type ValidatedUser = RTI.Validated<TUser>;
type IUser = RTIT.Interface<TUser>;

const mockNetworkData: IUser = {
	id: "this is not an id",
	username: "illle",
	password: "x6198ekasdj",
	email: "david@lundstrom.eu",
	age: 25,
	subscribesToNewsletter: true
};

const validated = User.validate(mockNetworkData);


function test(_user: ValidatedUser) {
	const {user} = RTI.assertValid({_user});
	
}



/* 
const {validated, error } = User.validateSafely(mockNetworkData);

if (validated) {
	error;
	validated;
} else {
	error;
}
 */