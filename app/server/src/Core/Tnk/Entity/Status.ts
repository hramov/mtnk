import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {TnkStatuses} from "../../Constants";

export class Status extends BaseEntity<number> {
    public title: string;
    public code: TnkStatuses;

    constructor(title: string, code: TnkStatuses) {
        super();
        this.title = title;
        this.code = code;
    }
}