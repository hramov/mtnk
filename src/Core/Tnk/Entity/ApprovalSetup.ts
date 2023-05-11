import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {Subprocess} from "./Subprocess";
import {Uuid} from "../../../Shared/src/ValueObject/Objects/Uuid";

export class ApprovalSetup extends BaseEntity<number> {
    private userId: Uuid;
    private subprocess: Subprocess;
    private description: string;
    private groupNum: number;
    private sortOrder: number;
    private isActive: boolean;
}