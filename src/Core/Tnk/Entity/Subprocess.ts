import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {Process} from "./Process";

export class Subprocess extends BaseEntity<number> {
    set process(value: Process) {
        this._process = value;
    }
    set esppObject(value: string) {
        this._esppObject = value;
    }
    set code(value: string) {
        this._code = value;
    }
    set title(value: string) {
        this._title = value;
    }
    private _title: string;
    private _code: string;
    private _esppObject: string;
    private _process: Process;
    private isActive: boolean;
}