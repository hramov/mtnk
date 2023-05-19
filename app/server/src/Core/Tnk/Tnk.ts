import { Operation } from './ValueObject/Operation';
import { ApprovingItem } from './ValueObject/ApprovingItem';
import { History } from './ValueObject/History';
import { BaseEntity } from '../../Shared/src/BaseEntity';
import { ConfigItem } from './ValueObject/ConfigItem';
import { WorkGroup } from './ValueObject/Workgroup';
import { Status } from './Entity/Status';
import { TnkType } from './Entity/TnkType';
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
import { ITnkEventRepository, TnkEvents } from './Repository/event/ITnkEventRepository';
import { ConfigItemIsAlreadyInListError } from './Error/ConfigItemIsAlreadyInListError';
import { WorkGroupIsAlreadyInListError } from './Error/WorkGroupIsAlreadyInListError';
import { OperationIsAlreadyInListError } from './Error/OperationIsAlreadyInListError';
import { ApproverIsAlreadyInListError } from './Error/ApproverIsAlreadyInListError';
import { ApprovingQueueIsEmptyError } from './Error/ApprovingQueueIsEmptyError';
import { ApproverIsNotInQueueError } from './Error/ApproverIsNotInQueueError';
import { ConfigItemRemoved } from './Events/ConfigItemRemoved';
import { WorkGroupRemoved } from './Events/WorkGroupRemoved';
import { OperationRemoved } from './Events/OperationRemoved';
import { OperationUpdated } from './Events/OperationUpdated';

export type TnkConstructor = {
    title: string;
    isActive: boolean;
    isDigital: boolean;
    isAutomated: boolean;
    status: Status;
    type: TnkType;
    process: Process;
    subprocess: Subprocess;

    creatorId?: string;
    creatorIp?: Ip;
    tnkId?: string;
    approvalQueue?: ApprovingItem[];
    configItems?: ConfigItem[];
    workGroups?: WorkGroup[];
    operations?: Operation[];
    history?: History[];
    dateCreated?: Date;
    lastUpdated?: Date;
    lastUpdatedBy?: string;
    timeline?: any[];
    userPrivileges?: any;
}

export class Tnk extends BaseEntity<string>{
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

    constructor(private readonly eventRepository: ITnkEventRepository) {
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
        this.configItems = tnk.configItems || [];
        this.workGroups = tnk.workGroups || [];
        this.operations = tnk.operations || [];
        this.history = tnk.history;
    }

    public async create(userId: string, userIp: Ip, approvalSetup: ApprovingItem[]) {

        // TODO check if user can create tnk in the subprocess

        const events: TnkEvents[] = [];
        this.dateCreated = new Date();
        const object = this.mapEntityToObject();
        const event = new TnkCreated(object.tnkId, userId, userIp, object);
        events.push(event);

        for (const approver of approvalSetup) {
            const event = await this.addApprover(approver, this.tnkId, userId, userIp)
            if (event instanceof ApproverIsAlreadyInListError) {
                return event;
            }
            events.push(event);
        }

        return this.eventRepository.writeEvents(events);
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
        return this.eventRepository.writeEvent(event);
    }

    public async updateWithChangingSubprocess(tnkData: TnkConstructor, tnkId: string, userId: string, userIp: Ip, approvalSetup: ApprovingItem[]) {
        const events: TnkEvents[] = [];

        if (this.status.code !== TnkStatuses.New && this.status.code !== TnkStatuses.Modified) {
            return new WrongTnkStatusError(this.status.title, ['Новая', 'На модификации']);
        }

        const delta = this.calculateDelta(tnkData);
        if (delta === null) {
            return new NothingToUpdateError();
        }

        const event = new TnkUpdated(userId, userIp, delta, tnkId);
        events.push(event);

        for (const approver of this.approvalQueue) {
            const event = this.removeApprover(approver, this.tnkId, userId, userIp);
            if (event instanceof Error) {
                return event;
            }
            events.push(event);
        }

        for (const approver of approvalSetup) {
            const event = this.addApprover(approver, this.tnkId, userId, userIp);
            if (event instanceof Error) {
                return event;
            }
            events.push(event);
        }

        return this.eventRepository.writeEvents(events);
    }

    public async addConfigItem(configItem: ConfigItem, tnkId: string, userId: string, userIp: Ip) {
        if (this.configItems) {
            for (const ci of this.configItems) {
                if (ci.equals(configItem)) {
                    return new ConfigItemIsAlreadyInListError();
                }
            }
        }

        const event = new ConfigItemAdded(userId, userIp, configItem, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    public async addWorkGroup(workGroup: WorkGroup, tnkId: string, userId: string, userIp: Ip) {
        for (const wg of this.workGroups) {
            if (wg.equals(workGroup)) {
                return new WorkGroupIsAlreadyInListError();
            }
        }

        const event = new WorkGroupAdded(userId, userIp, workGroup, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    public async addOperation(operation: Operation, tnkId: string, userId: string, userIp: Ip) {
        for (const op of this.operations) {
            if (op.equals(operation)) {
                return new OperationIsAlreadyInListError();
            }
        }

        const event = new OperationAdded(userId, userIp, operation, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    public async removeConfigItem(configItem: ConfigItem, tnkId: string, userId: string, userIp: Ip) {
        let counter = 0;
        if (this.configItems) {
            for (const ci of this.configItems) {
                if (ci.equals(configItem)) {
                    counter++
                }
            }
        }

        if (counter !== 1) {
            return new Error();
        }

        const event = new ConfigItemRemoved(userId, userIp, configItem, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    public async removeWorkGroup(workGroup: WorkGroup, tnkId: string, userId: string, userIp: Ip) {
        let counter = 0;
        for (const wg of this.workGroups) {
            if (wg.equals(workGroup)) {
                counter++;
            }
        }

        if (counter !== 1) {
            return new Error();
        }

        const event = new WorkGroupRemoved(userId, userIp, workGroup, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    public async updateOperation(operation: Operation, tnkId: string, userId: string, userIp: Ip) {
        let counter = 0;
        for (const op of this.operations) {
            if (op.equals(operation)) {
                return new OperationIsAlreadyInListError();
            }
        }

        if (counter !== 1) {
            return new Error();
        }

        const event = new OperationUpdated(userId, userIp, operation, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    public async removeOperation(operation: Operation, tnkId: string, userId: string, userIp: Ip) {
        let counter = 0;
        for (const op of this.operations) {
            if (op.equals(operation)) {
                return new OperationIsAlreadyInListError();
            }
        }

        if (counter !== 1) {
            return new Error();
        }

        const event = new OperationRemoved(userId, userIp, operation, tnkId);
        return this.eventRepository.writeEvent(event);
    }

    private addApprover(approvingItem: ApprovingItem, tnkId: string, userId: string, userIp: Ip) {
        if (this.approvalQueue) {
            for (const as of this.approvalQueue) {
                if (as.equals(approvingItem)) {
                    return new ApproverIsAlreadyInListError();
                }
            }
        }

        return new ApproverAdded(userId, userIp, approvingItem, tnkId);
    }

    private removeApprover(approvingItem: ApprovingItem, tnkId: string, userId: string, userIp: Ip) {
        let counter = 0;
        if (this.approvalQueue) {
            for (const as of this.approvalQueue) {
                if (as.equals(approvingItem)) {
                    counter++;
                }
            }

            if (counter === 0) {
                return new ApproverIsNotInQueueError();
            }

            approvingItem.isActive = false;
            return new ApproverRemoved(userId, userIp, approvingItem, tnkId);
        }
        return new ApprovingQueueIsEmptyError();
    }

    public async moveToApproving(tnkId: string, userId: string, userIp: Ip) {
        if (this.status.code === TnkStatuses.New || this.status.code === TnkStatuses.Modified) {
            const events: TnkEvents[] = [];
            this.approvalQueue.forEach((item: ApprovingItem) => {
                item.isApproved = null;
            })

            const delta = {
                tnkId: tnkId,
                status: new Status('На согласовании', TnkStatuses.Approving),
                approvalQueue: this.approvalQueue,
            } as TnkConstructor;

            const event = new TnkMovedToApproving(userId, userIp, tnkId);
            events.push(event);

            const updatedEvent = new TnkUpdated(userId, userIp, delta, tnkId);
            events.push(updatedEvent);

            return this.eventRepository.writeEvents(events);
        }
        return new Error();
    }

    public async moveToWithdrawn(tnkId: string, userId: string, userIp: Ip) {
        if (this.status.code === TnkStatuses.Approved) {
            const events: TnkEvents[] = [];
            const tnk = this.mapEntityToObject();
            tnk.status = new Status("Выведена", TnkStatuses.Withdrawn);
            const delta = this.calculateDelta(tnk);

            const event = new TnkMovedToWithdrawn(userId, userIp, tnkId);
            events.push(event);

            const updatedEvent = new TnkUpdated(userId, userIp, delta, tnkId);
            events.push(updatedEvent);

            return this.eventRepository.writeEvents(events);
        }
        return new Error();
    }

    public async approve(tnkId: string, userId: string, userIp: Ip) {
        const events: TnkEvents[] = [];
        if (this.status.code !== TnkStatuses.Approving) {
            return {
                result: new Error(),
                isApproved: false,
            };
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
            events.push(event);

            const approvalGroupChangedEvent = this.checkForApprovalGroupChanged(userId, userIp, currentGroup, tnkId);
            if (approvalGroupChangedEvent) {
                events.push(approvalGroupChangedEvent);
            }

            const approvedEvents = this.checkForApproved(tnkId, userId, userIp);
            if (approvedEvents) {
                events.push(...approvedEvents);
            }
            return {
                result: this.eventRepository.writeEvents(events),
                isApproved: !!approvedEvents,
            };
        }
        return {
            result: new Error(),
            isApproved: false,
        };
    }

    public async decline(tnkId: string, userId: string, userIp: Ip) {
        const events: TnkEvents[] = [];
        if (this.status.code !== TnkStatuses.Approving) {
            return new Error();
        }

        const currentGroup = this.getCurrentApprovalGroup();

        const previousItem = this.approvalQueue.findIndex((item) => item.userId === userId && !item.isApproved && item.groupNum === currentGroup);
        if (previousItem !== -1) {
            const approvingItem = new ApprovingItem({
                tnkId: tnkId,
                userId: userId,
                groupNum: currentGroup,
                isApproved: false,
                isActive: true,
                dateCreated: new Date(),
            });
            this.approvalQueue.splice(previousItem, 1, approvingItem);
            const event = new TnkDeclinedByApprover(userId, userIp, approvingItem, tnkId);
            events.push(event);

            const tnk = this.mapEntityToObject();
            tnk.status = new Status('На доработке', TnkStatuses.Modified);
            const updateEvent = new TnkUpdated(userId, userIp, tnk, tnkId);
            events.push(updateEvent);

            return this.eventRepository.writeEvents(events);
        }
        return new Error();
    }

    private checkForApproved(tnkId: string, userId: string, userIp: Ip) {
        if (this.approvalQueue.filter((item) => !item.isApproved).length === 0) {
            const events: TnkEvents[] = [];
            const tnk = this.mapEntityToObject();
            tnk.status = new Status('Утверждена', TnkStatuses.Approved)
            const event = new TnkApproved(userId, userIp, tnkId);
            events.push(event);

            const updateEvent = new TnkUpdated(userId, userIp, this.calculateDelta(tnk), tnkId);
            events.push(updateEvent);
            return events;
        }
    }

    private checkForApprovalGroupChanged(userId: string, userIp: Ip, group: number, tnkId: string) {
        const currentGroup = this.getCurrentApprovalGroup();
        if (group > currentGroup) {
            return new ApprovingGroupChanged(userId, userIp, currentGroup, tnkId);
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