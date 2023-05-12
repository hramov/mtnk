import { Uuid } from "../../Shared/src/ValueObject/Objects/Uuid";
import { Profile } from "./Entity/Profile";
import { Password } from "../../Shared/src/ValueObject/Objects/Password";
import { IAggregateRoot } from "../../Shared/src/IAggregateRoot";
import { BaseEntity } from "../../Shared/src/BaseEntity";
export declare class User extends BaseEntity<Uuid> implements IAggregateRoot {
    protected id: Uuid;
    private username;
    private fio;
    private email;
    private isActive;
    private profile;
    private password;
    setId(id: Uuid): this;
    setUsername(username: string): this;
    setPassword(password: string): this;
    load(user: User): void;
    getUserInfo(): never;
    getUserForLogin(): {
        id: Uuid;
        username: string;
        password: Password;
        role: string;
    };
    setProfile(profile: Profile): void;
}
