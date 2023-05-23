import {BaseEntity} from "../../../Shared/src/BaseEntity";
import { BLock } from './Block';

export class Dept extends BaseEntity<number> {
	public title: string;
	public block: BLock
	public isActive: string;
}