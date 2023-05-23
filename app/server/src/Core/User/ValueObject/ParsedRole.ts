import { ValueObject } from '../../../Shared/src/ValueObject/ValueObject';

export class ParsedRole extends ValueObject {
	public role: number;
	public blockId: number;
	public deptId: number;

	constructor(role: number, blockId: number, deptId: number) {
		super();
		this.role = role;
		this.blockId = blockId;
		this.deptId = deptId;
	}

	protected *getEqualityComponents(): IterableIterator<Object> {
		yield this.role;
		yield this.blockId;
		yield this.deptId;
	}
}