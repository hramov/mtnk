import { BaseEntity } from "../../../Shared/src/BaseEntity";
export declare class ReferenceOperation extends BaseEntity<number> {
    set blockId(value: number);
    set docNum(value: number);
    set sourceId(value: number);
    set unitId(value: number);
    set duration(value: number);
    set title(value: string);
    private _title;
    private _duration;
    private _unitId;
    private _sourceId;
    private _docNum;
    private _blockId;
}
