import { ITnkRepository } from "../../../../../Core/Tnk/ITnkRepository";
import { DatabaseError } from "../../../error/Database.error";
import { Tnk } from "../../../../../Core/Tnk/Tnk";
import { ILogger } from "../../../../../Core/ICore";
import { IDatabaseConnection } from "../IDatabaseConnection";
export declare class TnkRepository implements ITnkRepository {
    private readonly logger;
    private readonly storage;
    constructor(logger: ILogger, storage: IDatabaseConnection);
    create(dto: Tnk): Promise<Tnk | DatabaseError>;
    find(searchParams: any): Promise<Tnk[] | DatabaseError>;
    findOne(tnkId: number): Promise<Tnk | DatabaseError>;
    update(tnk: Tnk): Promise<Tnk | DatabaseError>;
}
