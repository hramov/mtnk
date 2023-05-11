import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class ReferenceOperation extends BaseEntity<number> {
    set blockId(value: number) {
        this._blockId = value;
    }
    set docNum(value: number) {
        this._docNum = value;
    }
    set sourceId(value: number) {
        this._sourceId = value;
    }
    set unitId(value: number) {
        this._unitId = value;
    }
    set duration(value: number) {
        this._duration = value;
    }
    set title(value: string) {
        this._title = value;
    }
    private _title: string;
    private _duration: number;
    private _unitId: number;
    private _sourceId: number;
    private _docNum: number;
    private _blockId: number;
}