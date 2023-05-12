import { BaseEntity } from "../../../Shared/src/BaseEntity";
import { Process } from "./Process";
export declare class Subprocess extends BaseEntity<number> {
    set process(value: Process);
    set esppObject(value: string);
    set code(value: string);
    set title(value: string);
    private _title;
    private _code;
    private _esppObject;
    private _process;
    private isActive;
}
