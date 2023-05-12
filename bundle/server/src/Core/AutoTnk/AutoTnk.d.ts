import { BaseEntity } from "../../Shared/src/BaseEntity";
import { Operation } from "../Tnk/Entity/Operation";
import { ApprovalQueue } from "../Tnk/Entity/ApprovalQueue";
import { Attribute } from "../Tnk/Entity/Attribute";
export declare class AutoTnk extends BaseEntity<number> {
    get attributes(): Attribute[];
    set attributes(value: Attribute[]);
    get operations(): Operation[];
    set operations(value: Operation[]);
    get history(): History[];
    set history(value: History[]);
    get approvalQueue(): ApprovalQueue;
    set approvalQueue(value: ApprovalQueue);
    get processId(): number;
    set processId(value: number);
    get isDigital(): boolean;
    set isDigital(value: boolean);
    get isActive(): boolean;
    set isActive(value: boolean);
    get subprocessId(): number;
    set subprocessId(value: number);
    get title(): string;
    set title(value: string);
    get isAutomated(): string;
    set isAutomated(value: string);
    get statusId(): number;
    set statusId(value: number);
    get type(): string;
    set type(value: string);
    private _title;
    private _processId;
    private _subprocessId;
    private _isActive;
    private _isDigital;
    private _isAutomated;
    private _statusId;
    private _type;
    private _attributes;
    private _operations;
    private _history;
    private _approvalQueue;
}
