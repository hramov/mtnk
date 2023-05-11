import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {Email} from "../../Shared/src/ValueObject/Objects/Email";
import {Profile} from "./Entity/Profile";
import {Password} from "../../Shared/src/ValueObject/Objects/Password";
import {DateTime} from "../../Shared/src/ValueObject/Objects/DateTime";

export class User {
    private id: Uuid;
    private username: string;
    private fio: string;
    private email: Email;
    private isActive: boolean;
    private profile: Profile;
    private password: Password;
    private dateCreated: DateTime;
    private lastUpdated: DateTime;
    private lastUpdatedBy: Uuid;

    constructor() {}

    public setId(id: Uuid) {
        this.id = id;
        return this;
    }

    public setUsername(username: string) {
        this.username = username;
        return this;
    }

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

    public getUserInfo() {
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