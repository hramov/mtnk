import {Email} from "../../Shared/src/ValueObject/Objects/Email";
import {Profile} from "./Entity/Profile";
import {Password} from "../../Shared/src/ValueObject/Objects/Password";
import {IAggregateRoot} from "../../Shared/src/IAggregateRoot";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {Ip} from "../../Shared/src/ValueObject/Objects/Ip";
import { IUserEventRepository } from './Repository/event/IUserEventRepository';
import { TnkConstructor } from '../Tnk/Tnk';
import { DatabaseError } from '../Error/Database.error';
import { UserCreated } from './Events/UserCreated';
import { NothingToUpdateError } from '../Tnk/Error/NothingToUpdateError';
import { UserUpdated } from './Events/UserUpdated';
import { UserPasswordChanged } from './Events/UserPasswordChanged';
import { ParsedRole } from './ValueObject/ParsedRole';
import { Roles } from './Roles';

export type UserConstructor = {
    userId: string
    username: string;
    fio: string;
    email: Email;
    isActive: boolean;
    profile: Profile;
    password: Password;
    ip: Ip;
}

export type BlockPrivileges = {
    search: boolean
    show: boolean;
    create: boolean,
    update: boolean
}

export type DeptPrivileges = {
    search: boolean
    show: boolean;
    create: boolean;
    update: boolean;
    linkToBLock: boolean;
}

export type ProfilePrivileges = {
    search: boolean
    show: boolean;
    create: boolean;
    update: boolean;
    linkToBLock: boolean;
    linkToSubprocess: boolean;
}

export type UserPrivileges = {
    create: boolean;
    update: boolean;
    updateUsername: boolean;
    changePassword: boolean;
    resetPassword: boolean;
}

export type TnkPrivileges = {
    search: boolean
    show: boolean;
    create: boolean;
    update: boolean;
    addWorkGroup: boolean,
    removeWorkGroup: boolean;
    addConfigItem: boolean;
    removeConfigItem: boolean;
    addOperation: boolean;
    updateOperation: boolean;
    removeOperation: boolean;
    moveToApproving: boolean;
    approve: boolean;
    decline: boolean;
    moveToConfirmation: boolean;
    confirm: boolean;
    withdraw: boolean;
}

export type Privileges = {
    block: BlockPrivileges;
    dept: DeptPrivileges;
    profile: ProfilePrivileges;
    user: UserPrivileges;
    tnk: TnkPrivileges
}

export class User extends BaseEntity<string> implements IAggregateRoot {
    public userId: string;
    public username: string;
    public fio: string;
    public email: Email;
    public isActive: boolean;
    public profile: Profile;
    public password: Password;
    public ip: Ip;

    constructor(private readonly eventRepository: IUserEventRepository) {
        super();
    }

    private static checkFieldsEquality<T>(field1: T, field2: T): boolean {
        return JSON.stringify(field1) === JSON.stringify(field2);
    }

    private static async getBlockPrivileges(parsedRole: ParsedRole): Promise<BlockPrivileges> {
        if (parsedRole.role === Roles.MtnkAdmin || parsedRole.role === Roles.BlockAdmin) {
            return {
                search: true,
                show: true,
                create: true,
                update: true,
            }
        }
        return {
            search: false,
            show: false,
            create: false,
            update: false,
        }
    }

    private static async getDeptPrivileges(parsedRole: ParsedRole): Promise<DeptPrivileges> {
        return null;
    }

    private static async getProfilePrivileges(parsedRole: ParsedRole): Promise<ProfilePrivileges> {
        return null;
    }

    private static async getUserPrivileges(parsedRole: ParsedRole): Promise<UserPrivileges> {
        return null;
    }

    private static async getTnkPrivileges(parsedRole: ParsedRole): Promise<TnkPrivileges> {
        return null;
    }

    public load(user: UserConstructor) {
        this.userId = user.userId;
        this.username = user.username;
        this.fio = user.fio;
        this.email = user.email;
        this.isActive = user.isActive;
        this.profile = user.profile;
        this.password = user.password;
        this.ip = user.ip;
    }

    public getUserForLogin() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.profile.getParsedRole(),
        }
    }

    public async create(userId: string, userIp: Ip) {
        const object = this.mapEntityToObject();
        const event = new UserCreated(object.userId, userId, userIp, object);
        return this.eventRepository.writeEvent(event);
    }

    public async update(userData: UserConstructor, aggregateId: string, userId: string, userIp: Ip) {
        const delta = this.calculateDelta(userData);

        if (delta === null) {
            return new NothingToUpdateError();
        }

        const event = new UserUpdated(userId, userIp, delta, aggregateId);
        return this.eventRepository.writeEvent(event);
    }

    public async find(userId: string): Promise<User | DatabaseError> {
        const userData = await this.eventRepository.getByAggregateId(userId)
        if (userData instanceof DatabaseError) {
            return userData;
        }
        this.load(userData);
        return this;
    }

    public async changePassword(password: string, aggregateId: string, userId: string, userIp: Ip) {
        const event = new UserPasswordChanged(aggregateId, userId, userIp, {
            password: password,
        });
        return this.eventRepository.writeEvent(event);
    }

    public async resetPassword() {}

    public async getPrivileges(tnk: TnkConstructor): Promise<Privileges> {
        const parsedRole = this.profile.role.parse();
        return {
            block: await User.getBlockPrivileges(parsedRole),
            dept: await User.getDeptPrivileges(parsedRole),
            profile: await User.getProfilePrivileges(parsedRole),
            user: await User.getUserPrivileges(parsedRole),
            tnk: await User.getTnkPrivileges(parsedRole),
        }
    }

    private mapEntityToObject(): UserConstructor {
        return {
            userId: this.userId,
            username: this.username,
            fio: this.fio,
            email: this.email,
            isActive: this.isActive,
            profile: this.profile,
            password: this.password,
            ip: this.ip,
        }
    }

    private calculateDelta(userData: UserConstructor): UserConstructor | null {
        const currentUser = this.mapEntityToObject()
        let diff = null;

        for (let key in userData) {
            if (diff === null) diff = {};

            const isEqual = User.checkFieldsEquality(userData[key], currentUser[key]);
            if (!isEqual) {
                diff[key] = userData[key];
            }
        }
        return Object.keys(diff).length > 0 ? diff : null;
    }
}