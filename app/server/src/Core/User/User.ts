import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {Email} from "../../Shared/src/ValueObject/Objects/Email";
import {Profile} from "./Entity/Profile";
import {Password} from "../../Shared/src/ValueObject/Objects/Password";
import {IAggregateRoot} from "../../Shared/src/IAggregateRoot";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {Ip} from "../../Shared/src/ValueObject/Objects/Ip";

export class User extends BaseEntity<Uuid> implements IAggregateRoot {
    public username: string;
    public fio: string;
    public email: Email;
    public isActive: boolean;
    public profile: Profile;
    public password: Password;
    public ip: Ip;

    public load(user: User) {
        this.username = user.username;
        this.fio = user.fio;
        this.email = user.email;
        this.isActive = user.isActive;
        this.profile = user.profile;
        this.password = user.password;
        this.dateCreated = user.dateCreated;
        this.lastUpdated = user.lastUpdated;
        this.lastUpdatedBy = user.lastUpdatedBy;
    }

    public async getUserInfo(): Promise<User> {
        return { ...this, password: '' }
    }

    public getUserForLogin() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.profile.getParsedRole(),
        }
    }
}