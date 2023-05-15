import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {Operation} from "./Entity/Operation";
import {ApprovalQueue} from "./Entity/ApprovalQueue";
import {History} from "./Entity/History";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {ConfigItem} from "./Entity/ConfigItem";
import {WorkGroup} from "./Entity/Workgroup";
import {Attribute} from "./Entity/Attribute";
import {TokenData} from "../User/ValueObject/TokenData";
import {ApproveData} from "./ValueObject/ApproveData";
import {Process} from "./Entity/Process";
import {Subprocess} from "./Entity/Subprocess";

export class Tnk extends BaseEntity<Uuid>{
    get configItems(): ConfigItem[] {
        return this._configItems;
    }

    set configItems(value: ConfigItem[]) {
        this._configItems = value;
    }

    get workGroups(): WorkGroup[] {
        return this._workGroups;
    }

    set workGroups(value: WorkGroup[]) {
        this._workGroups = value;
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

    get approvalQueue(): ApprovalQueue[] {
        return this._approvalQueue;
    }

    set approvalQueue(value: ApprovalQueue[]) {
        this._approvalQueue = value;
    }
    get process(): Process {
        return this._process;
    }

    set process(value: Process) {
        this._process = value;
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
    get subprocess(): Subprocess {
        return this._subprocess;
    }

    set subprocess(value: Subprocess) {
        this._subprocess = value;
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
    private _process: Process;
    private _subprocess: Subprocess;
    private _isActive: boolean;
    private _isDigital: boolean;
    private _isAutomated: string;
    private _statusId: number;
    private _type: string;

    private _configItems: ConfigItem[];
    private _workGroups: WorkGroup[];
    private _operations: Operation[];
    private _history: History[];
    private _approvalQueue: ApprovalQueue[];

    constructor(tnk?: Tnk) {
        super();

        if (tnk) {
            this.title = tnk.title;
            this.process = tnk.process;
            this.subprocess = tnk.subprocess;
            this.isActive = tnk.isActive;
            this.isDigital = tnk.isDigital;
            this.isAutomated = tnk.isAutomated;
            this.statusId = tnk.statusId;
            this.type = tnk.type;
        }
    }

    async addConfigurationItem(configItem: ConfigItem): Promise<number | Error> {
        return null;
    }

    async addWorkGroup(workGroup: WorkGroup): Promise<number | Error> {
        return null;
    }

    async addOperation(operation: Operation): Promise<number | Error> {
        return null;
    }

    async addAttribute(attribute: Attribute): Promise<number | Error> {
        return null;
    }

    async approve(user: TokenData, dto: ApproveData): Promise<number | Error> {
        return null;
    }

    async getTnkToApprove(user: TokenData): Promise<number | Error> {
        return null;
    }

}