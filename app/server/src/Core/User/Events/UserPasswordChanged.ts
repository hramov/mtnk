import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class UserPasswordChanged extends BaseEvent<{password: string}> {
	constructor(aggregateId: string, userId: string, userIp: Ip, data: {password: string}) {
		super();
		this.aggregateId = aggregateId
		this.userId = userId;
		this.userIp = userIp;
		this.data = data;
		this.type = 'UserPasswordChanged';
		this.dateCreated = new Date();
	}
}