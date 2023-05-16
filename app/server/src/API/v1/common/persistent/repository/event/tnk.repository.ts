import * as _ from "lodash";

import {ILogger} from "../../../../../../Core/ICore";
import {IDatabaseConnection} from "../../IDatabaseConnection";
import {DatabaseError} from "../../../../error/Database.error";
import {IEventBus} from "../../../../../../Core/IEventBus";
import {TnkCreatedEvent} from "../../../../../../Core/Tnk/Events/TnkCreated";
import {BaseEvent} from "../../../../../../Core/BaseEvent";
import {TnkConstructor} from "../../../../../../Core/Tnk/Tnk";
import {TnkUpdatedEvent} from "../../../../../../Core/Tnk/Events/TnkUpdated";
import {ConfigItemAdded} from "../../../../../../Core/Tnk/Events/ConfigItemAdded";
import {WorkGroupAdded} from "../../../../../../Core/Tnk/Events/WorkGroupAdded";
import {OperationAdded} from "../../../../../../Core/Tnk/Events/OperationAdded";
import {ConfigItem} from "../../../../../../Core/Tnk/ValueObject/ConfigItem";
import {WorkGroup} from "../../../../../../Core/Tnk/ValueObject/Workgroup";
import {Operation} from "../../../../../../Core/Tnk/ValueObject/Operation";
import {TnkSearchParams} from "../../../../../../Core/Tnk/ValueObject/TnkSearchParams";
import {ApprovingItem} from "../../../../../../Core/Tnk/ValueObject/ApprovingItem";
import {TnkApproved} from "../../../../../../Core/Tnk/Events/TnkApproved";
import {TnkApprovedByApprover} from "../../../../../../Core/Tnk/Events/TnkApprovedByApprover";
import {TnkDeclinedByApprover} from "../../../../../../Core/Tnk/Events/TnkDeclinedByApprover";

type TnkEvents = TnkCreatedEvent | TnkUpdatedEvent | ConfigItemAdded | WorkGroupAdded | OperationAdded | TnkApprovedByApprover | TnkApproved | TnkDeclinedByApprover;

export class TnkEventRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {
        this.writeListener();
    }

    writeListener() {
        this.eventBus.on('tnk-event', async (event: TnkEvents) => {
            const lastRevision = await this.storage.queryOne<{ max: number }>(`
                select max(revision) 
                from aggregate.tnk 
                where "aggregateId" = $1 and type = $2
            `, [event.aggregateId, event.type]);
            if (lastRevision instanceof DatabaseError) {
                this.logger.error(lastRevision.message, 'TnkEventRepository', lastRevision.stack, {
                    method: 'writeListener'
                })
                return;
            }

            const nextRevision = lastRevision.max ? lastRevision.max + 1 : 1;

            const sql = `
                INSERT INTO aggregate.tnk ("aggregateId", "dateCreated", "userId", "userIp", "revision", "data", "type")
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

            const params = [event.aggregateId, event.dateCreated, event.userId, event.userIp.value, nextRevision, event.data, event.type];

            const result = await this.storage.queryOne<{ id: number }>(sql, params);
            if (result instanceof DatabaseError) {
                this.logger.error(result.message, 'TnkEventRepository', result.stack, {
                    method: 'writeListener'
                })
                return;
            }
        });
    }

    async getByAggregateId(aggregateId: string): Promise<TnkConstructor | DatabaseError> {
        const sql = `
            SELECT "aggregateId", "dateCreated", "userId", "userIp", "revision", "data", "type" 
            FROM aggregate.tnk 
            WHERE "aggregateId" = $1
            ORDER BY "dateCreated"
        `;
        const params = [aggregateId];

        const result = await this.storage.query<BaseEvent<TnkConstructor>>(sql, params);
        if (result instanceof DatabaseError) {
            this.logger.error(result.message, 'TnkEventRepository', null, {
                method: 'writeListener'
            });
            return result;
        }

        return this.assemblyTnk(result);
    }

    async get(searchParams: TnkSearchParams): Promise<TnkConstructor[] | DatabaseError> {
        const sql = `
            SELECT *  
            FROM report.tnk
            ORDER BY "dateCreated" DESC
            LIMIT $1 OFFSET $2
        `;
        const params = [searchParams.limit, searchParams.offset];

        const result = await this.storage.query<TnkConstructor>(sql, params);
        if (result instanceof DatabaseError) {
            this.logger.error(result.message, 'TnkEventRepository', null, {
                method: 'writeListener'
            });
        }
        return result;
    }

    private assemblyTnk(eventData: BaseEvent<any>[]): TnkConstructor {
        let tnk: TnkConstructor = null;
        for (const event of eventData) {
            if (event.type === 'TnkCreated' || event.type === 'TnkUpdated') {
                if (tnk === null) {
                    tnk = _.merge({}, event.data);
                } else {
                    tnk = _.merge(tnk, event.data);
                }
            } else if (event.type === 'ConfigItemAdded') {
                const data = new ConfigItem(event.data.tnkId, event.data.title);
                if (tnk.configItems && Array.isArray(tnk.configItems)) {
                    tnk.configItems.push(data);
                } else {
                    tnk.configItems = [data];
                }
            } else if (event.type === 'WorkGroupAdded') {
                const data = new WorkGroup(event.data.tnkId, event.data.title);
                if (tnk.workGroups && Array.isArray(tnk.workGroups)) {
                    tnk.workGroups.push(data);
                } else {
                    tnk.workGroups = [data];
                }
            } else if (event.type === 'OperationAdded') {
                const data = new Operation({
                    tnkId: event.data.tnkId,
                    title: event.data.title,
                    referenceOperationId: event.data.referenceOperationId,
                    amount: event.data.amount,
                    assignee: event.data.assignee,
                    sortOrder: event.data.sortOrder,
                })
                if (tnk.operations && Array.isArray(tnk.operations)) {
                    tnk.operations.push(data)
                } else {
                    tnk.operations = [data]
                }
            } else if (event.type === 'ApproverAdded') {
                const data = new ApprovingItem({
                    tnkId: event.data.tnkId,
                    userId: event.data.userId,
                    isActive: event.data.isActive,
                    groupNum: event.data.groupNum,
                    isApproved: null,
                    dateCreated: event.dateCreated,
                })
                if (tnk.approvalQueue && Array.isArray(tnk.approvalQueue)) {
                    tnk.approvalQueue.push(data);
                } else {
                    tnk.approvalQueue = [data];
                }
            } else if (event.type === 'TnkApprovedByApprover') {
                const previousItem = tnk.approvalQueue.findIndex((item) => item.userId === event.data.userId);
                if (previousItem !== -1) {
                    const data = new ApprovingItem({
                        tnkId: event.data.tnkId,
                        userId: event.data.userId,
                        isActive: event.data.isActive,
                        groupNum: event.data.groupNum,
                        isApproved: event.data.isApproved,
                        dateCreated: event.dateCreated,
                    });

                    tnk.approvalQueue.splice(previousItem, 1, data);
                }
            }
        }

        tnk.tnkId = eventData[0].aggregateId;
        return tnk;
    }
}