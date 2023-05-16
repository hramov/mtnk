import {Tnk, TnkConstructor} from "../Tnk";
import {BaseEvent} from "../../BaseEvent";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import {ConfigItem} from "../ValueObject/ConfigItem";

export class ConfigItemAdded extends BaseEvent<ConfigItem> {
    constructor(userId: string, userIp: Ip, data: ConfigItem, tnkId: string) {
        super();
        this.aggregateId = tnkId;
        this.userId = userId;
        this.userIp = userIp;
        this.data = data;
        this.type = 'ConfigItemAdded';
        this.dateCreated = new Date();
    }
}