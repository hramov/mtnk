import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Role} from "../Entity/Role";

export class TokenData {
    public userId: Uuid;
    public username: string;
    public role: Role
}