import {IDatabaseConnection} from "../IDatabaseConnection";
import {ILogger} from "../../../../../Core/ICore";
import {IUserRepository} from "../../../../../Core/User/IUserRepository";
import {User} from "../../../../../Core/User/User";
import {Profile} from "../../../../../Core/User/Entity/Profile";
import {Uuid} from "../../../../../Shared/src/ValueObject/Objects/Uuid";
import {DatabaseError} from "../../../../../Core/Error/Database.error";
import {IEventBus} from "../../../../../Core/IEventBus";

export class UserRepository implements IUserRepository {
    constructor(private readonly logger: ILogger, private readonly eventBus: IEventBus, private readonly storage: IDatabaseConnection) {
    }

    async getUserByUsername(username: string): Promise<User | DatabaseError> {
        this.logger.log('Got request to fetch data', 'UserRepository', {
            method: 'getUserByUsername'
        });

        const sql = `select id, username, password from auth.account where username = $1 and is_active = true`;
        const params = [username];
        const fetched = await this.storage.queryOne<User>(sql, params);

        if (fetched instanceof Error) {
            this.logger.error('Cannot fetch data: ' + fetched.message, 'UserRepository', fetched.stack, {
                method: 'getUserByUsername'
            });

            return new DatabaseError()
        }

        return fetched;
    }

    getProfileById(profileId: number): Promise<Profile> {
        return Promise.resolve(undefined);
    }

    getUserById(userId: Uuid): Promise<User> {
        return Promise.resolve(undefined);
    }

    create(user: any): Promise<User | DatabaseError> {
        return Promise.resolve(undefined);
    }

    find(searchParams: any): Promise<User[] | DatabaseError> {
        return Promise.resolve(undefined);
    }

    update(user: User): Promise<User | DatabaseError> {
        return Promise.resolve(undefined);
    }
}