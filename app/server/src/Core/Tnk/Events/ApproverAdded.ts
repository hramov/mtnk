import {BaseEvent} from "../../BaseEvent";
import {ApprovingItem} from "../ValueObject/ApprovingItem";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class ApproverAdded extends BaseEvent<ApprovingItem> {
    constructor(userId: string, userIp: Ip, data: ApprovingItem, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'ApproverAdded';
        this.dateCreated = new Date();
    }
}