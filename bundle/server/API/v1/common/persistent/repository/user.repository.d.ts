import { IDatabaseConnection } from "../IDatabaseConnection";
import { ILogger } from "../../../../../Core/ICore";
import { IUserRepository } from "../../../../../Core/User/IUserRepository";
import { User } from "../../../../../Core/User/User";
import { Profile } from "../../../../../Core/User/Entity/Profile";
import { Uuid } from "../../../../../Shared/src/ValueObject/Objects/Uuid";
import { DatabaseError } from "../../../error/Database.error";
export declare class UserRepository implements IUserRepository {
    private readonly logger;
    private readonly storage;
    constructor(logger: ILogger, storage: IDatabaseConnection);
    getUserByUsername(username: string): Promise<User | DatabaseError>;
    getProfileById(profileId: number): Promise<Profile>;
    getUserById(userId: Uuid): Promise<User>;
    create(user: any): Promise<User | DatabaseError>;
    find(searchParams: any): Promise<User[] | DatabaseError>;
    update(user: User): Promise<User | DatabaseError>;
}
