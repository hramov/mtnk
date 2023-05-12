import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {ApprovalSetup} from "./ApprovalSetup";

export class ApprovalQueue extends BaseEntity<number> {
    private setup: ApprovalSetup[];
    private currentGroup: number;
    private tnkId: number;

}