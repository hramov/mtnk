import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Assignee extends BaseEntity<number> {
    public title: string;

    constructor(title: string) {
        super();
        this.title = title;
    }
}