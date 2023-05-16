import {Operation} from "./ValueObject/Operation";
import {ApprovalQueue} from "./ValueObject/ApprovalQueue";
import {History} from "./ValueObject/History";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {ConfigItem} from "./ValueObject/ConfigItem";
import {WorkGroup} from "./ValueObject/Workgroup";
import {Status} from "./Entity/Status";
import {TnkType} from "./Entity/TnkType";
import {IEventPublisher} from "../../Shared/src/EventSourcing/IEventPublisher";
import {Ip} from "../../Shared/src/ValueObject/Objects/Ip";
import {TnkCreatedEvent} from "./Events/TnkCreated";
import {TnkUpdatedEvent} from "./Events/TnkUpdated";
import {ConfigItemAdded} from "./Events/ConfigItemAdded";
import {OperationAdded} from "./Events/OperationAdded";
import {WorkGroupAdded} from "./Events/WorkGroupAdded";

const AGGREGATE_EVENT = 'tnk-event';

export type TnkConstructor = {
    title: string;
    isActive: boolean;
    isDigital: boolean;
    isAutomated: boolean;
    status: Status;
    type: TnkType;
    processId: number;
    subprocessId: number;

    tnkId?: string;
    approvalQueue?: ApprovalQueue[];
    configItems?: ConfigItem[];
    workGroups?: WorkGroup[];
    operations?: Operation[];
    history?: History[];
}

export class Tnk extends BaseEntity<number>{
    public tnkId: string;
    public title: string;
    public isActive: boolean;
    public isDigital: boolean;
    public isAutomated: boolean;
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

    public mapEntityToObject(): TnkConstructor {
        return {
            title: this.title,
            isActive: this.isActive,
            isDigital: this.isDigital,
            isAutomated: this.isAutomated,
            status: this.status,
            type: this.type,
            processId: this.processId,
            subprocessId: this.subprocessId,
            tnkId: this.tnkId,
            approvalQueue: this.approvalQueue,
            configItems: this.configItems,
            workGroups: this.workGroups,
            operations: this.operations,
            history: this.history,
        }
    }

    public async create(userId: string, userIp: Ip) {
        const event = new TnkCreatedEvent(userId, userIp, this.mapEntityToObject())
        await this.eventPublisher.publish<TnkConstructor, TnkCreatedEvent>(AGGREGATE_EVENT, event)
    }

    public async update(tnkData: TnkConstructor, tnkId: string, userId: string, userIp: Ip) {
        const delta = this.calculateDelta(tnkData);
        if (delta === null) {
            return;
        }

        const event = new TnkUpdatedEvent(userId, userIp, delta, tnkId);
        await this.eventPublisher.publish<TnkConstructor, TnkUpdatedEvent>(AGGREGATE_EVENT, event)
    }

    public async addConfigItem(configItem: ConfigItem, tnkId: string, userId: string, userIp: Ip) {

        if (this.configItems) {
            for (const ci of this.configItems) {
                if (ci.equals(configItem)) {
                    return;
                }
            }
        }

        const event = new ConfigItemAdded(userId, userIp, configItem, tnkId);
        await this.eventPublisher.publish<ConfigItem, ConfigItemAdded>(AGGREGATE_EVENT, event);
    }

    public async addWorkGroup(workGroup: WorkGroup, tnkId: string, userId: string, userIp: Ip) {
        for (const wg of this.workGroups) {
            if (wg.equals(workGroup)) {
                return;
            }
        }

        const event = new WorkGroupAdded(userId, userIp, workGroup, tnkId);
        await this.eventPublisher.publish<WorkGroup, WorkGroupAdded>(AGGREGATE_EVENT, event);
    }

    public async addOperation(operation: Operation, tnkId: string, userId: string, userIp: Ip) {
        for (const op of this.operations) {
            if (op.equals(operation)) {
                return;
            }
        }

        const event = new OperationAdded(userId, userIp, operation, tnkId);
        await this.eventPublisher.publish<Operation, OperationAdded>(AGGREGATE_EVENT, event);
    }

    public calculateDelta(tnkData: TnkConstructor): TnkConstructor | null {
        const currentTnk = this.mapEntityToObject()
        let diff = null;

        for (let key in tnkData) {
            if (diff === null) diff = {};

            const isEqual = this.checkFieldsEquality(tnkData[key], currentTnk[key]);
            if (!isEqual) {
                diff[key] = tnkData[key];
            }
        }
        return Object.keys(diff).length > 0 ? diff : null;
    }

    private checkFieldsEquality<T>(field1: T, field2: T): boolean {
        return JSON.stringify(field1) === JSON.stringify(field2);

    }

}