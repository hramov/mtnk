import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Process extends BaseEntity<number> {
    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }
    set code(value: string) {
        this._code = value;
    }
    set title(value: string) {
        this._title = value;
    }

    get title() {
        return this._title;
    }

    set processId(value: number) {
        this.id = value
    }

    private _title: string;
    private _code: string;
    private _isActive: boolean;

    serialize() {
        return {
            id: this.id,
            title:  this._title,
            code: this._code
        }
    }
}