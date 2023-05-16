import {TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class TnkUpdatedEvent extends BaseEvent<TnkConstructor> {
    constructor(userId: string, userIp: Ip, data: TnkConstructor, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'TnkUpdated';
        this.dateCreated = new Date();
    }
}