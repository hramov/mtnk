import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";
import {ISubprocessRepository} from "../../../../../Core/Tnk/Repository/ISubprocessRepository";
import {Subprocess} from "../../../../../Core/Tnk/Entity/Subprocess";
import {DatabaseError} from "../../../error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";

export class SubprocessRepository implements ISubprocessRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {}

    create(dto: Subprocess): Promise<Subprocess | DatabaseError> {
        return Promise.resolve(undefined);
    }

    find(): Promise<Subprocess[] | DatabaseError> {
        return Promise.resolve(undefined);
    }

    findOne(subprocessId: number): Promise<Subprocess | DatabaseError> {
        return Promise.resolve(undefined);
    }

    update(process: Subprocess): Promise<Subprocess | DatabaseError> {
        return Promise.resolve(undefined);
    }
}