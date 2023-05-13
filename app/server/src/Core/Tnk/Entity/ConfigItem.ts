import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class ConfigItem extends BaseEntity<number> {
    get tnkId(): number {
        return this._tnkId;
    }

    set tnkId(value: number) {
        this._tnkId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }
    private _tnkId: number;
    private _title: string;
    private _isActive: boolean;
}