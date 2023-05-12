import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {Operation} from "../Tnk/Entity/Operation";
import {ApprovalQueue} from "../Tnk/Entity/ApprovalQueue";
import {Attribute} from "../Tnk/Entity/Attribute";
import {IAggregateRoot} from "../../Shared/src/IAggregateRoot";

export class AutoTnk extends BaseEntity<number> {
    get attributes(): Attribute[] {
        return this._attributes;
    }

    set attributes(value: Attribute[]) {
        this._attributes = value;
    }

    get operations(): Operation[] {
        return this._operations;
    }

    set operations(value: Operation[]) {
        this._operations = value;
    }

    get history(): History[] {
        return this._history;
    }

    set history(value: History[]) {
        this._history = value;
    }

    get approvalQueue(): ApprovalQueue {
        return this._approvalQueue;
    }

    set approvalQueue(value: ApprovalQueue) {
        this._approvalQueue = value;
    }
    get processId(): number {
        return this._processId;
    }

    set processId(value: number) {
        this._processId = value;
    }
    get isDigital(): boolean {
        return this._isDigital;
    }

    set isDigital(value: boolean) {
        this._isDigital = value;
    }
    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }
    get subprocessId(): number {
        return this._subprocessId;
    }

    set subprocessId(value: number) {
        this._subprocessId = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get isAutomated(): string {
        return this._isAutomated;
    }

    set isAutomated(value: string) {
        this._isAutomated = value;
    }

    get statusId(): number {
        return this._statusId;
    }

    set statusId(value: number) {
        this._statusId = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    private _title: string;
    private _processId: number;
    private _subprocessId: number;
    private _isActive: boolean;
    private _isDigital: boolean;
    private _isAutomated: string;
    private _statusId: number;
    private _type: string;
    private _attributes: Attribute[];
    private _operations: Operation[];
    private _history: History[];
    private _approvalQueue: ApprovalQueue;

}