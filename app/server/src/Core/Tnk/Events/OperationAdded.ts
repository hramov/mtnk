import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {Operation} from "../ValueObject/Operation";

export class OperationAdded extends BaseEvent<Operation> {
    constructor(userId: string, userIp: Ip, data: Operation, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'OperationAdded';
        this.dateCreated = new Date();
    }
}