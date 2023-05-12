import { BaseEntity } from "../../../Shared/src/BaseEntity";
export declare class WorkGroup extends BaseEntity<number> {
    get tnkId(): number;
    set tnkId(value: number);
    get title(): string;
    set title(value: string);
    get isActive(): boolean;
    set isActive(value: boolean);
    private _tnkId;
    private _title;
    private _isActive;
}
