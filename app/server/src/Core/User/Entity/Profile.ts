import {Role} from "./Role";
import {BaseEntity} from "../../../Shared/src/BaseEntity";

export class Profile extends BaseEntity<number> {
    protected id: number;
    private title: string;
    private isActive: boolean;
    private isTnkTypeEnabled: boolean;
    private role: Role

    public setRole(role: Role) {
        this.role = role;
    }
    public getParsedRole() {
        return this.role.parse();
    }
}