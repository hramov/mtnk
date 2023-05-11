import {DateTime} from "../../../Shared/src/ValueObject/Objects/DateTime";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";
import {Role} from "./Role";

export class Profile {
    private id: number;
    private title: string;
    private isActive: boolean;
    private dateCreated: DateTime;
    private lastUpdated: DateTime;
    private lastUpdatedBy: Uuid;
    private isTnkTypeEnabled: boolean;
    private role: Role

    getParsedRole() {
        return this.role.parse();
    }
}