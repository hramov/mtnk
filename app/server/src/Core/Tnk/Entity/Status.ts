import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Status extends BaseEntity<number> {
    public title: string;
    public code: number;

    constructor(title: string, code: number) {
        super();
        this.title = title;
        this.code = code;
    }
}