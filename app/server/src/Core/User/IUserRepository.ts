import { User, UserConstructor } from './User';
import {DatabaseError} from "../Error/Database.error";
import {IBaseRepository} from "../../Shared/src/IBaseRepository";
import { UserSearchParams } from './ValueObject/UserSearchParams';
import { Ip } from '../../Shared/src/ValueObject/Objects/Ip';
import { Candidate } from './ValueObject/Candidate';

export interface IUserRepository extends IBaseRepository {
    create(user: UserConstructor, userId: string, userIp: Ip): Promise<{id: number} | DatabaseError>
    update(user: UserConstructor, userId: string, userIp: Ip): Promise<{id: number} | DatabaseError>
    find(searchParams: UserSearchParams): Promise<User[] | DatabaseError>
    getUserForLogin(username: string): Promise<Candidate | DatabaseError>
}