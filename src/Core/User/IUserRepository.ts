import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {User} from "./User";
import {Profile} from "./Entity/Profile";

export interface IUserRepository {
    getUserById(userId: Uuid): Promise<User>
    getUserByUsername(username: string): Promise<User>
    getProfileById(profileId: number): Promise<Profile>
}