import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {ApprovingItem} from "../ValueObject/ApprovingItem";

export class TnkDeclinedByApprover extends BaseEvent<ApprovingItem> {
    constructor(userId: string, userIp: Ip, data: ApprovingItem, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'TnkDeclinedByApprover';
        this.dateCreated = new Date();
    }
}