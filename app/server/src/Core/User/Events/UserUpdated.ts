import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import { UserConstructor } from '../User';

export class UserUpdated extends BaseEvent<UserConstructor> {
	constructor(userId: string, userIp: Ip, data: UserConstructor, aggregateId: string) {
		super();
		this.aggregateId = aggregateId;
		this.userId = userId;
		this.userIp = userIp;
		this.data = data;
		this.type = 'UserUpdated';
		this.dateCreated = new Date();
	}
}