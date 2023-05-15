import {Uuid} from "../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../Shared/src/ValueObject/Objects/Ip";

export class BaseEvent<T> {
    public aggregateId: string;
    public dateCreated: Date;
    public userId: Uuid;
    public userIp: Ip;
    public revision: number;
    public data: T;
    public type: string;
}