import { BaseEntity } from "../../../Shared/src/BaseEntity";
export declare class Process extends BaseEntity<number> {
    set code(value: string);
    set title(value: string);
    private _title;
    private _code;
    private isActive;
}
