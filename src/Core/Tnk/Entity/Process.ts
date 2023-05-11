import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Process extends BaseEntity<number> {
    private title: string;
    private code: string;
    private isActive: boolean;
}