import {BaseEvent} from "../../BaseEvent";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";
import { ConfigItem } from '../ValueObject/ConfigItem';

export class ConfigItemRemoved extends BaseEvent<ConfigItem> {
	constructor(userId: string, userIp: Ip, data: ConfigItem, tnkId: string) {
		super();
		this.aggregateId = tnkId;
		this.userId = userId;
		this.userIp = userIp;
		this.data = data;
		this.type = 'ConfigItemRemoved';
		this.dateCreated = new Date();
	}
}