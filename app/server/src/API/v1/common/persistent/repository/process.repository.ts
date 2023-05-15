import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {IProcessRepository, ProcessSearchParams} from "../../../../../Core/Tnk/Repository/IProcessRepository";
import {Process} from "../../../../../Core/Tnk/Entity/Process";
import {DatabaseError} from "../../../error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";

export class ProcessRepository implements IProcessRepository {

    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {}

    create(dto: Process): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }

    async find(searchParams: ProcessSearchParams): Promise<Process[] | DatabaseError> {
        console.log(searchParams);
        const process = new Process()
        process.processId = 1;
        process.title = 'Процесс';
        process.code = 'code'
        return [process]

        // const processes = await this.storage.query<Process>('select * from tnk.process where title ilike $1', [searchParams.title]);
        // if (processes instanceof DatabaseError) {
        //     this.logger.error(`Cannot fetch processes: ${processes}`, 'TnkRepository', processes.stack, {
        //         method: 'findOne'
        //     })
        // }
        // return processes;
    }

    findOne(processId: number): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }

    update(process: Process): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }
    constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection) {}
}