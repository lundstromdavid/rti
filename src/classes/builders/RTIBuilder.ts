import { RTIClass } from "../RTIClass";

export abstract class RTIBuilder<Optional extends boolean, T extends RTIClass<any, Optional>> {

	abstract lock(): T;

}