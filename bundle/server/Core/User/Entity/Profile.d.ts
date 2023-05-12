import { Role } from "./Role";
import { BaseEntity } from "../../../Shared/src/BaseEntity";
export declare class Profile extends BaseEntity<number> {
    protected id: number;
    private title;
    private isActive;
    private isTnkTypeEnabled;
    private role;
    setRole(role: Role): void;
    getParsedRole(): string;
}
