import { Operation } from './ValueObject/Operation';
import { ApprovingItem } from './ValueObject/ApprovingItem';
import { History } from './ValueObject/History';
import { BaseEntity } from '../../Shared/src/BaseEntity';
import { ConfigItem } from './ValueObject/ConfigItem';
import { WorkGroup } from './ValueObject/Workgroup';
import { Status } from './Entity/Status';
import { TnkType } from './Entity/TnkType';
import { IEventPublisher } from '../../Shared/src/EventSourcing/IEventPublisher';
import { Ip } from '../../Shared/src/ValueObject/Objects/Ip';
import { TnkCreated } from './Events/TnkCreated';
import { TnkUpdated } from './Events/TnkUpdated';
import { ConfigItemAdded } from './Events/ConfigItemAdded';
import { OperationAdded } from './Events/OperationAdded';
import { WorkGroupAdded } from './Events/WorkGroupAdded';
import { TnkApprovedByApprover } from './Events/TnkApprovedByApprover';
import { TnkDeclinedByApprover } from './Events/TnkDeclinedByApprover';
import { Process } from './Entity/Process';
import { Subprocess } from './Entity/Subprocess';
import { ApproverAdded } from './Events/ApproverAdded';
import { ApproverRemoved } from './Events/ApproverRemoved';
import { TnkApproved } from './Events/TnkApproved';
import { TnkStatuses } from '../Constants';
import { TnkMovedToApproving } from './Events/TnkMovedToApproving';
import { TnkMovedToWithdrawn } from './Events/TnkMovedToWithdrawn';
import { ApprovingGroupChanged } from './Events/ApprovingGroupChanged';
import { WrongTnkStatusError } from './Error/WrongTnkStatusError';
import { NothingToUpdateError } from './Error/NothingToUpdateError';

const AGGREGATE_EVENT = 'tnk-event';

export type TnkConstructor = {
    title: string;
    isActive: boolean;
    isDigital: boolean;
    isAutomated: boolean;
    status: Status;
    type: TnkType;
    process: Process;
    subprocess: Subprocess;

    tnkId?: string;
    approvalQueue?: ApprovingItem[];
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
    public process: Process;
    public subprocess: Subprocess;

    public approvalQueue: ApprovingItem[];
    public configItems: ConfigItem[];
    public workGroups: WorkGroup[];
    public operations: Operation[];
    public history: History[];

    constructor(private readonly eventPublisher: IEventPublisher) {
        super();
    }

    private static checkFieldsEquality<T>(field1: T, field2: T): boolean {
        return JSON.stringify(field1) === JSON.stringify(field2);

    }

    public load(tnk: TnkConstructor) {
        this.title = tnk.title;
        this.isActive = tnk.isActive;
        this.isDigital = tnk.isDigital;
        this.isAutomated = tnk.isAutomated;
        this.status = tnk.status;
        this.type = tnk.type;
        this.process = tnk.process;
        this.subprocess = tnk.subprocess;

        this.tnkId = tnk.tnkId;
        this.approvalQueue = tnk.approvalQueue;
        this.configItems = tnk.configItems;
        this.workGroups = tnk.workGroups;
        this.operations = tnk.operations;
        this.history = tnk.history;
    }

    public async create(userId: string, userIp: Ip) {

        // TODO check if user can create tnk in the subprocess

        const object = this.mapEntityToObject()
        const event = new TnkCreated(object.tnkId, userId, userIp, this.mapEntityToObject());
        await this.eventPublisher.publish<TnkConstructor, TnkCreated>(AGGREGATE_EVENT, event);
    }

    public async update(tnkData: TnkConstructor, tnkId: string, userId: string, userIp: Ip) {

        if (this.status.code !== TnkStatuses.New && this.status.code !== TnkStatuses.Modified) {
            return new WrongTnkStatusError(this.status.title, ['Новая', 'На модификации']);
        }

        const delta = this.calculateDelta(tnkData);
        if (delta === null) {
            return new NothingToUpdateError();
        }

        const event = new TnkUpdated(userId, userIp, delta, tnkId);
        await this.eventPublisher.publish<TnkConstructor, TnkUpdated>(AGGREGATE_EVENT, event);
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

    public async addApprover(approvingItem: ApprovingItem, tnkId: string, userId: string, userIp: Ip) {
        if (this.approvalQueue) {
            for (const as of this.approvalQueue) {
                if (as.equals(approvingItem)) {
                    return;
                }
            }
        }

        const event = new ApproverAdded(userId, userIp, approvingItem, tnkId);
        await this.eventPublisher.publish<ApprovingItem, ApproverAdded>(AGGREGATE_EVENT, event);
    }

    public async removeApprover(approvingItem: ApprovingItem, tnkId: string, userId: string, userIp: Ip) {
        approvingItem.isActive = false;
        const event = new ApproverRemoved(userId, userIp, approvingItem, tnkId);
        await this.eventPublisher.publish<ApprovingItem, ApproverRemoved>(AGGREGATE_EVENT, event);
    }

    public async moveToApproving(tnkId: string, userId: string, userIp: Ip) {
        if (this.status.code === TnkStatuses.New || this.status.code === TnkStatuses.Modified) {
            const tnk = this.mapEntityToObject();
            tnk.status = new Status("На согласовании", TnkStatuses.Approving);
            const delta = this.calculateDelta(tnk);

            const event = new TnkMovedToApproving(userId, userIp, tnkId);
            await this.eventPublisher.publish<void, TnkMovedToApproving>(AGGREGATE_EVENT, event);

            const updatedEvent = new TnkUpdated(userId, userIp, delta, tnkId);
            await this.eventPublisher.publish<TnkConstructor, TnkUpdated>(AGGREGATE_EVENT, updatedEvent);
        }
    }

    public async moveToWithdrawn(tnkId: string, userId: string, userIp: Ip) {
        if (this.status.code === TnkStatuses.Approved) {
            const tnk = this.mapEntityToObject();
            tnk.status = new Status("Выведена", TnkStatuses.Withdrawn);
            const delta = this.calculateDelta(tnk);

            const event = new TnkMovedToWithdrawn(userId, userIp, tnkId);
            await this.eventPublisher.publish<void, TnkMovedToWithdrawn>(AGGREGATE_EVENT, event);

            const updatedEvent = new TnkUpdated(userId, userIp, delta, tnkId);
            await this.eventPublisher.publish<TnkConstructor, TnkUpdated>(AGGREGATE_EVENT, updatedEvent);
        }
    }

    public async approve(tnkId: string, userId: string, userIp: Ip) {
        if (this.status.code !== TnkStatuses.Approving) {
            return;
        }

        const currentGroup = this.getCurrentApprovalGroup();

        const previousItem = this.approvalQueue.findIndex((item) => item.userId === userId && !item.isApproved && item.groupNum === currentGroup);
        if (previousItem !== -1) {
            const approvingItem = new ApprovingItem({
                tnkId: tnkId,
                userId: userId,
                groupNum: currentGroup,
                isApproved: true,
                isActive: true,
                dateCreated: new Date(),
            });
            this.approvalQueue.splice(previousItem, 1, approvingItem);
            const event = new TnkApprovedByApprover(userId, userIp, approvingItem, tnkId);
            await this.eventPublisher.publish<ApprovingItem, TnkApprovedByApprover>(AGGREGATE_EVENT, event);
            await this.checkForApprovalGroupChanged(userId, userIp, currentGroup, tnkId);
            await this.checkForApproved(tnkId, userId, userIp);
        }
    }

    public async decline(approvingItem: ApprovingItem, tnkId: string, userId: string, userIp: Ip) {

        if (this.status.code !== TnkStatuses.Approving) {
            return;
        }

        const currentGroup = this.getCurrentApprovalGroup();

        if (currentGroup !== approvingItem.groupNum) {
            return;
        }

        if (approvingItem.userId !== userId) {
            return;
        }

        if (!approvingItem.comments) {
            return;
        }

        const previousItem = this.approvalQueue.findIndex((item) => item.userId === approvingItem.userId);
        if (previousItem !== -1) {
            this.approvalQueue.splice(previousItem, 1, approvingItem);

            const event = new TnkDeclinedByApprover(userId, userIp, approvingItem, tnkId);
            await this.eventPublisher.publish<ApprovingItem, TnkDeclinedByApprover>(AGGREGATE_EVENT, event);

            const tnk = this.mapEntityToObject();
            tnk.status = new Status('На доработке', TnkStatuses.Modified);

            const updateEvent = new TnkUpdated(userId, userIp, this.calculateDelta(tnk), tnkId);
            await this.eventPublisher.publish<TnkConstructor, TnkUpdated>(AGGREGATE_EVENT, updateEvent);
        }
    }

    public async checkForApproved(tnkId: string, userId: string, userIp: Ip) {
        if (this.approvalQueue.filter((item) => !item.isApproved).length === 0) {
            const tnk = this.mapEntityToObject();
            tnk.status = new Status('Утверждена', TnkStatuses.Approved)
            const event = new TnkApproved(userId, userIp, tnkId);
            await this.eventPublisher.publish<void, TnkApproved>(AGGREGATE_EVENT, event);

            const updateEvent = new TnkUpdated(userId, userIp, this.calculateDelta(tnk), tnkId);
            await this.eventPublisher.publish<TnkConstructor, TnkUpdated>(AGGREGATE_EVENT, updateEvent);
        }
    }

    public async checkForApprovalGroupChanged(userId: string, userIp: Ip, group: number, tnkId: string) {
        const currentGroup = this.getCurrentApprovalGroup();
        if (group > currentGroup) {
            const event = new ApprovingGroupChanged(userId, userIp, currentGroup, tnkId);
            await this.eventPublisher.publish<number, ApprovingGroupChanged>(AGGREGATE_EVENT, event);
        }
    }

    public calculateDelta(tnkData: TnkConstructor): TnkConstructor | null {
        const currentTnk = this.mapEntityToObject()
        let diff = null;

        for (let key in tnkData) {
            if (diff === null) diff = {};

            const isEqual = Tnk.checkFieldsEquality(tnkData[key], currentTnk[key]);
            if (!isEqual) {
                diff[key] = tnkData[key];
            }
        }
        return Object.keys(diff).length > 0 ? diff : null;
    }

    private mapEntityToObject(): TnkConstructor {
        return {
            title: this.title,
            isActive: this.isActive,
            isDigital: this.isDigital,
            isAutomated: this.isAutomated,
            status: this.status,
            type: this.type,
            process: this.process,
            subprocess: this.subprocess,
            tnkId: this.tnkId,
            approvalQueue: this.approvalQueue,
            configItems: this.configItems,
            workGroups: this.workGroups,
            operations: this.operations,
            history: this.history,
        }
    }

    private getCurrentApprovalGroup(): number {
        const approvalGroups = this.subprocess.approvalSetup.map((item) => item.groupNum);
        const maxApprovalGroup = Math.max(...approvalGroups);

        const approved = this.approvalQueue
            .filter((item: ApprovingItem) => item.isApproved === true)
            .map((item: ApprovingItem) => item.groupNum);

        let lastApproved: number = 1;
        if (approved.length) {
            lastApproved = Math.max(...approved);
        }

        const countApproverInGroup = this.approvalQueue.filter((item: ApprovingItem) => item.groupNum === lastApproved);
        const countApprovedApproverInGroup = countApproverInGroup.filter((item: ApprovingItem) => item.isApproved === true);

        if (countApprovedApproverInGroup.length === countApproverInGroup.length && lastApproved !== maxApprovalGroup) {
           return lastApproved + 1;
        }
        return lastApproved;
    }
}