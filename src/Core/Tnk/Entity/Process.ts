import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Process extends BaseEntity<number> {
    set code(value: string) {
        this._code = value;
    }
    set title(value: string) {
        this._title = value;
    }
    private _title: string;
    private _code: string;
    private isActive: boolean;
}