import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {Subprocess} from "./Subprocess";
import {Ip} from "../../../Shared/src/ValueObject/Objects/Ip";

export class ApprovalQueue extends BaseEntity<number> {
    private tnkId: number;
    private subprocess: Subprocess;
    private isApproved: boolean;
    private description: string;
    private groupNum: number;
    private userIp: Ip;
}