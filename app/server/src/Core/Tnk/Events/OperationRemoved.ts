import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import { Operation } from '../ValueObject/Operation';

export class OperationRemoved extends BaseEvent<Operation> {
	constructor(userId: string, userIp: Ip, data: Operation, tnkId: string) {
		super();
		this.aggregateId = tnkId;
		this.userId = userId;
		this.userIp = userIp;
		this.data = data;
		this.type = 'OperationRemoved';
		this.dateCreated = new Date();
	}
}