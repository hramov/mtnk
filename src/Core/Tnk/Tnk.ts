import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
import {Operation} from "./Entity/Operation";
import {ApprovalSetup} from "./Entity/ApprovalSetup";
import {ApprovalQueue} from "./Entity/ApprovalQueue";
import {History} from "./Entity/History";
import {BaseEntity} from "../../Shared/src/BaseEntity";

export abstract class Tnk extends BaseEntity<Uuid>{
    private tnkId: number;
    private title: string;
    private subprocessId: number;
    private isActive: boolean;
    private isDigital: boolean;
    private isAutomated: string;
    private statusId: number;
    private tnkType: string;
    private operations: Operation[];
    private approvalSetup: ApprovalSetup[];
    private approvalQueue: ApprovalQueue[];
    private history: History[];
}