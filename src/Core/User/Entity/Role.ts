import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Role extends BaseEntity<number> {
    private role: string;

    public setRole(rawRole: string) {
        this.role = rawRole;
    }

    public parse() {
        return this.role;
    }
}