import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {ApprovingItem} from "../ValueObject/ApprovingItem";

export class TnkApprovedByApprover extends BaseEvent<ApprovingItem> {
    constructor(userId: string, userIp: Ip, data: ApprovingItem, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'TnkApprovedByApprover';
        this.dateCreated = new Date();
    }
}