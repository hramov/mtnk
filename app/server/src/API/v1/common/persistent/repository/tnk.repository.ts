import {ITnkRepository} from "../../../../../Core/Tnk/Repository/ITnkRepository";
import {DatabaseError} from "../../../error/Database.error";
import {Tnk} from "../../../../../Core/Tnk/Tnk";
import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {ConfigItem} from "../../../../../Core/Tnk/ValueObject/ConfigItem";
import {WorkGroup} from "../../../../../Core/Tnk/ValueObject/Workgroup";
import {Operation} from "../../../../../Core/Tnk/ValueObject/Operation";
import {ApprovalQueue} from "../../../../../Core/Tnk/ValueObject/ApprovalQueue";
import {History} from "../../../../../Core/Tnk/ValueObject/History";
import {IEventBus} from "../../../../../Core/IEventBus";

export class TnkRepository implements ITnkRepository {

    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {
    }

    async create(dto: Tnk): Promise<Tnk | DatabaseError> {
        return Promise.resolve(undefined);
    }

    async find(searchParams: any): Promise<Tnk[] | DatabaseError> {
        return Promise.resolve(undefined);
    }

    async findOne(tnkId: number): Promise<Tnk | DatabaseError> {
        const tnk = await this.storage.queryOne<Tnk>('select * from tnk.tnk where id = $1', [tnkId]);
        if (tnk instanceof DatabaseError) {
            this.logger.error(`Cannot fetch tnk: ${tnk}`, 'TnkRepository', tnk.stack, {
                method: 'findOne'
            })
            return tnk;
        }

        const configItems = await this.storage.query<ConfigItem>('select * from tnk.tnk_to_ci where tnk_id = $1 and is_active = true', [tnkId]);
        if (configItems instanceof DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${configItems}`, 'TnkRepository', configItems.stack, {
                method: 'findOne'
            })
            return configItems;
        }

        const workGroups = await this.storage.query<WorkGroup>('select * from tnk.tnk_to_wg where tnk_id = $1 and is_active = true', [tnkId]);
        if (workGroups instanceof DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${workGroups}`, 'TnkRepository', workGroups.stack, {
                method: 'findOne'
            })
            return workGroups;
        }

        const operations = await this.storage.query<Operation>('select * from tnk.tnk_to_operation where tnk_id = $1 and is_active = true', [tnkId]);
        if (operations instanceof DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${operations}`, 'TnkRepository', operations.stack, {
                method: 'findOne'
            })
            return operations;
        }

        const approvalQueue = await this.storage.query<ApprovalQueue>('select * from tnk.approval_queue where tnk_id = $1 and is_active = true', [tnkId]);
        if (approvalQueue instanceof DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${approvalQueue}`, 'TnkRepository', approvalQueue.stack, {
                method: 'findOne'
            })
            return approvalQueue;
        }

        const history = await this.storage.query<History>('', [tnkId])
        if (history instanceof DatabaseError) {
            this.logger.error(`Cannot fetch config items: ${history}`, 'TnkRepository', history.stack, {
                method: 'findOne'
            })
            return history;
        }

        if (tnk instanceof Tnk) {
            tnk.configItems = configItems as ConfigItem[];
            tnk.workGroups = workGroups as WorkGroup[];
            tnk.operations = operations as Operation[];
            tnk.approvalQueue = approvalQueue as ApprovalQueue[];
            tnk.history = history as History[];
        }

        return tnk;

    }

    async update(tnk: Tnk): Promise<Tnk | DatabaseError> {
        return Promise.resolve(undefined);
    }

}