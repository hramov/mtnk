import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class TnkCreated extends BaseEvent<TnkConstructor> {
    constructor(aggregateId: string, userId: string, userIp: Ip, data: TnkConstructor) {
        super();
        this.aggregateId = aggregateId,
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'TnkCreated';
        this.dateCreated = new Date();
    }
}