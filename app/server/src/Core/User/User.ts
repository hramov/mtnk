import {Email} from "../../Shared/src/ValueObject/Objects/Email";
import {Profile} from "./Entity/Profile";
import {Password} from "../../Shared/src/ValueObject/Objects/Password";
import {IAggregateRoot} from "../../Shared/src/IAggregateRoot";
import {BaseEntity} from "../../Shared/src/BaseEntity";
import {Ip} from "../../Shared/src/ValueObject/Objects/Ip";
import { IUserEventRepository } from './Repository/event/IUserEventRepository';
import { TnkConstructor } from '../Tnk/Tnk';
import { DatabaseError } from '../Error/Database.error';

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

    public load(user: UserConstructor) {
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

    public async create() {

    }

    public async update() {}

    public async find(userId: string): Promise<User | DatabaseError> {
        const userData = await this.eventRepository.getByAggregateId(userId)
        if (userData instanceof DatabaseError) {
            return userData;
        }
        this.load(userData);
        return this;
    }

    public async changePassword() {}

    public async resetPassword() {}

    public async getPrivileges(tnk: TnkConstructor): Promise<Privileges> {
        return {
            block: await this.getBlockPrivileges(),
            dept: await this.getDeptPrivileges(),
            profile: await this.getProfilePrivileges(),
            user: await this.getUserPrivileges(),
            tnk: await this.getTnkPrivileges(),
        }
    }

    private async getBlockPrivileges(): Promise<BlockPrivileges> {
        return null;
    }

    private async getDeptPrivileges(): Promise<DeptPrivileges> {
        return null;
    }

    private async getProfilePrivileges(): Promise<ProfilePrivileges> {
        return null;
    }

    private async getUserPrivileges(): Promise<UserPrivileges> {
        return null;
    }

    private async getTnkPrivileges(): Promise<TnkPrivileges> {
        return null;
    }
}