import {Tnk} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class CreateNewTnkEvent extends BaseEvent<Tnk> {
    constructor(userId: Uuid, userIp: Ip, data: Tnk) {
        super();
        this.aggregateId = 'TNK-' + new Uuid().toString();
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'CreateNewTnk';
        this.dateCreated = new Date();
    }
}