import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {Status} from "../Entity/Status";

export class TnkApproved extends BaseEvent<void> {
    constructor(userId: string, userIp: Ip, tnkId: string) {
        super();

        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.type = 'TnkApproved';
        this.dateCreated = new Date();
    }
}