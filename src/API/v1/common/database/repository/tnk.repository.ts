import {ITnkRepository} from "../../../../../Core/Tnk/ITnkRepository";
import {DatabaseError} from "../../../error/Database.error";
import {Tnk} from "../../../../../Core/Tnk/Tnk";
import {TnkBody} from "../../../../../Core/Tnk/ValueObject/TnkBody";
import {ILogger} from "../../../../../Core/ICore";
import {IDatabaseConnection} from "../IDatabaseConnection";

export class TnkRepository implements ITnkRepository {

    constructor(private readonly logger: ILogger, private readonly storage: IDatabaseConnection) {
    }

    create(dto: TnkBody): Promise<Tnk | DatabaseError> {
        return Promise.resolve(undefined);
    }

    find(searchParams: any): Promise<Tnk[] | DatabaseError> {
        return Promise.resolve(undefined);
    }

    findOne(tnkId: number): Promise<Tnk | DatabaseError> {
        return Promise.resolve(undefined);
    }

    update(tnk: Tnk): Promise<Tnk | DatabaseError> {
        return Promise.resolve(undefined);
    }

}