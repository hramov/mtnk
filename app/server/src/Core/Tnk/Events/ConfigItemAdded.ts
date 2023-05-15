import {ConfigItem} from "../ValueObject/ConfigItem";

export interface ConfigItemAddedEvent {
    tnkId: number;
    configItem: ConfigItem
    date: Date;
}