import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class TnkMovedToWithdrawn extends BaseEvent<void> {
    constructor(userId: string, userIp: Ip, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.type = 'TnkMovedToWithdrawn';
        this.dateCreated = new Date();
    }
}