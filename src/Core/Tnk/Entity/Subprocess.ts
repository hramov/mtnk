import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {Process} from "./Process";

export class Subprocess extends BaseEntity<number> {
    private title: string;
    private code: string;
    private esppObject: string;
    private process: Process;
    private isActive: boolean;
}