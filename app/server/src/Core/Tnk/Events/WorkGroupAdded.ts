import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {WorkGroup} from "../ValueObject/Workgroup";

export class WorkGroupAdded extends BaseEvent<WorkGroup> {
    constructor(userId: string, userIp: Ip, data: WorkGroup, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'WorkGroupAdded';
        this.dateCreated = new Date();
    }
}