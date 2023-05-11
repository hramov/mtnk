import { v4 as uuidv4, NIL } from 'uuid';
import { ValueObject } from '../ValueObject';

export class Uuid extends ValueObject {
	private readonly value: string;
	constructor() {
		super();
		this.value = uuidv4();
	}

	public toString() {
		return String(this.value);
	}

	public getNil() {
		return NIL;
	}

	public isNil() {
		return this.value === NIL;
	}

	protected *getEqualityComponents(): IterableIterator<Object> {
		yield this.value;
	}
}
