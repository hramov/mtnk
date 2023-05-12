import { BaseEntity } from "../../../Shared/src/BaseEntity";
export declare class Role extends BaseEntity<number> {
    private role;
    setRole(rawRole: string): void;
    parse(): string;
}
