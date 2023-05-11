import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class WorkGroup extends BaseEntity<number> {
    private tnkId: number;
    private title: string;
    private isActive: boolean;
}