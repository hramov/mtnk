import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {WorkGroup} from "../ValueObject/Workgroup";

export class WorkGroupRemoved extends BaseEvent<WorkGroup> {
	constructor(userId: string, userIp: Ip, data: WorkGroup, tnkId: string) {
		super();
		this.aggregateId = tnkId;
		this.userId = userId;
		this.userIp = userIp;
		this.data = data;
		this.type = 'WorkGroupRemoved';
		this.dateCreated = new Date();
	}
}