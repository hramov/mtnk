import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class BLock extends BaseEntity<number> {
	public title: string;
	public isActive: string;
}