import {IBaseRepository} from "../../../Shared/src/IBaseRepository";
import { Tnk } from '../Tnk';
import {DatabaseError} from "../../Error/Database.error";
import { TnkSearchParams } from '../ValueObject/TnkSearchParams';
import { Ip } from '../../../Shared/src/ValueObject/Objects/Ip';

export interface ITnkRepository extends IBaseRepository {
    find: (searchParams: TnkSearchParams) => Promise<Tnk[] | DatabaseError>
    findOne: (tnkId: number) => Promise<Tnk | DatabaseError>
    create: (dto: any, userId: string, userIp: Ip) => Promise<{ id: number } | DatabaseError>
    update: (tnk: any) => Promise<{ id: number } | DatabaseError>
}
