import { RTI, string, number, optional  } from "../RTI";


const User = RTI.create({
	id: string,
	username: string.range(8, 25), 
	password: string.range(8, 25),
	email: string,
	age: number,
	subscribesToNewsletter: optional.boolean,
});

type TUser = typeof User;
type ValidatedUser = RTI.Validated<TUser>;
type IUser = RTI.ConvertToInterface<TUser>;

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