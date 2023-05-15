import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Process extends BaseEntity<number> {
    public title: string;
    public code: string;
    public isActive: boolean;

    constructor(title: string, code: string, isActive: boolean) {
        super();
        this.title = title;
        this.code = code;
        this.isActive = isActive;
    }
}