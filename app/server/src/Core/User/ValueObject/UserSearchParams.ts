import {ValueObject} from "../../../Shared/src/ValueObject/ValueObject";

export class UserSearchParams extends ValueObject {

	public limit: number;
	public offset: number;

	constructor(limit, offset: number) {
		super();
		this.limit = limit;
		this.offset = offset;
	}

	protected *getEqualityComponents(): IterableIterator<Object> {
		return undefined;
	}

}