import { Uuid } from "../../../Shared/src/ValueObject/Objects/Uuid";
import { Role } from "../Entity/Role";
export declare class TokenData {
    userId: Uuid;
    username: string;
    role: Role;
}
