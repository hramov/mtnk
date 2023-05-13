import {Tnk} from "./Tnk";
import {IAggregateRoot} from "../../Shared/src/IAggregateRoot";
import {Attribute} from "./Entity/Attribute";

export class AttributesTnk extends Tnk implements IAggregateRoot {
    public isAuto: boolean;
    public baseTnk: number;
    public attributes: Attribute[];
}