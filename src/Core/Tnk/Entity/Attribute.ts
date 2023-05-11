import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {CiWgList} from "../ValueObject/CiWgList";
import {AttributeList} from "../ValueObject/AttributeList";

export class Attribute extends BaseEntity<number> {
    private tnkId: number;
    private attributesList: AttributeList;
    private ciWgList: CiWgList;
    private isActive: boolean;
}