import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {IProcessRepository, ProcessSearchParams} from "../../../../../Core/Tnk/Repository/IProcessRepository";
import {Process} from "../../../../../Core/Tnk/Entity/Process";
import {DatabaseError} from "../../../../../Core/Error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";

export class ProcessRepository implements IProcessRepository {

    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {}

    create(dto: Process): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }


    findOne(processId: number): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }

    update(process: Process): Promise<Process | DatabaseError> {
        return Promise.resolve(undefined);
    }

    find(params: ProcessSearchParams): Promise<Process[] | DatabaseError> {
        return Promise.resolve(undefined);
    }
}