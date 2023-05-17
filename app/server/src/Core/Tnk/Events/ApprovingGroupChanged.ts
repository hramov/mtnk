import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class ApprovingGroupChanged extends BaseEvent<number> {
    constructor(userId: string, userIp: Ip, data: number, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'ApprovingGroupChanged';
        this.dateCreated = new Date();
    }
}