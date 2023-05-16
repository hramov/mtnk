import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class TnkApproved extends BaseEvent<TnkConstructor> {
    constructor(userId: string, userIp: Ip, data: TnkConstructor, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'TnkApproved';
        this.dateCreated = new Date();
    }
}