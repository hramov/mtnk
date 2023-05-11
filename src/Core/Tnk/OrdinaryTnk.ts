import {Tnk} from "./Tnk";
import {IAggregateRoot} from "../../Shared/src/IAggregateRoot";
import {ConfigItem} from "./Entity/ConfigItem";
import {WorkGroup} from "./Entity/Workgroup";

export class OrdinaryTnk extends Tnk implements IAggregateRoot {
    public configItems: ConfigItem[];
    public workGroups: WorkGroup[];
}