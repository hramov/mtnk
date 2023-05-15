import {Operation} from "./ValueObject/Operation";
import {ApprovalQueue} from "./ValueObject/ApprovalQueue";
import {History} from "./ValueObject/History";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {ConfigItem} from "./ValueObject/ConfigItem";
import {WorkGroup} from "./ValueObject/Workgroup";
import {Status} from "./Entity/Status";
import {TnkType} from "./Entity/TnkType";
import {IEventPublisher} from "../../Shared/src/EventSourcing/IEventPublisher";
import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {TnkCreatedEvent} from "./Events/TnkCreated";
import {TnkUpdatedEvent} from "./Events/TnkUpdated";

export type TnkConstructor = {
    title: string;
    isActive: boolean;
    isDigital: boolean;
    isAutomated: string;
    status: Status;
    type: TnkType;
    processId: number;
    subprocessId: number;

    tnkId?: Uuid;
    approvalQueue?: ApprovalQueue[];
    configItems?: ConfigItem[];
    workGroups?: WorkGroup[];
    operations?: Operation[];
    history?: History[];
}

export class Tnk extends BaseEntity<number>{
    public tnkId: Uuid;
    public title: string;
    public isActive: boolean;
    public isDigital: boolean;
    public isAutomated: string;
    public status: Status;
    public type: TnkType;
    public processId: number;
    public subprocessId: number;

    public approvalQueue: ApprovalQueue[];
    public configItems: ConfigItem[];
    public workGroups: WorkGroup[];
    public operations: Operation[];
    public history: History[];

    constructor(private readonly eventPublisher: IEventPublisher) {
        super();
    }

    public load(tnk: TnkConstructor) {
        this.title = tnk.title;
        this.isActive = tnk.isActive;
        this.isDigital = tnk.isDigital;
        this.isAutomated = tnk.isAutomated;
        this.status = tnk.status;
        this.type = tnk.type;
        this.processId = tnk.processId;
        this.subprocessId = tnk.subprocessId;

        this.tnkId = tnk.tnkId;
        this.approvalQueue = tnk.approvalQueue;
        this.configItems = tnk.configItems;
        this.workGroups = tnk.workGroups;
        this.operations = tnk.operations;
        this.history = tnk.history;
    }

    public async save() {
        let event: TnkCreatedEvent | TnkUpdatedEvent;
        if (this.tnkId) {
            event = {
                tnkId: this.tnkId,
                tnk: this,
                date: new Date(),
            }
        } else {
            event = {
                tnkId: new Uuid(),
                tnk: this,
                date: new Date(),
            }
        }
        await this.eventPublisher.publish(event)
    }

}