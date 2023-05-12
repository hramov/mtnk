import { Tnk } from "./Tnk";
import { IAggregateRoot } from "../../Shared/src/IAggregateRoot";
import { Attribute } from "./Entity/Attribute";
export declare class AttributesTnk extends Tnk implements IAggregateRoot {
    isAuto: boolean;
    baseTnk: number;
    attributes: Attribute[];
}
