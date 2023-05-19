import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import { UserConstructor } from '../User';

export class UserCreated extends BaseEvent<UserConstructor> {
	constructor(aggregateId: string, userId: string, userIp: Ip, data: UserConstructor) {
		super();
		this.aggregateId = aggregateId
		this.userId = userId;
		this.userIp = userIp;
		this.data = data;
		this.type = 'UserCreated';
		this.dateCreated = new Date();
	}
}