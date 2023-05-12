import { Uuid } from "../../Shared/src/ValueObject/Objects/Uuid";
import { User } from "./User";
import { Profile } from "./Entity/Profile";
import { DatabaseError } from "../../API/v1/error/Database.error";
import { IBaseRepository } from "../../Shared/src/IBaseRepository";
export interface IUserRepository extends IBaseRepository {
    create(user: any): Promise<User | DatabaseError>;
    update(user: User): Promise<User | DatabaseError>;
    find(searchParams: any): Promise<User[] | DatabaseError>;
    getUserById(userId: Uuid): Promise<User | DatabaseError>;
    getUserByUsername(username: string): Promise<User | DatabaseError>;
    getProfileById(profileId: number): Promise<Profile | DatabaseError>;
}
