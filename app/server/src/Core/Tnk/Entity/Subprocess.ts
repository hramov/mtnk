import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {ApprovingItem} from "../ValueObject/ApprovingItem";

export type SubprocessConstructor = {
    processId: number;
    title: string;
    code: string;
    esppObject: string;
    isActive: boolean;
    itsmProcessId: number;
    approvalSetup: ApprovingItem[]
}

export class Subprocess extends BaseEntity<number> {
    public title: string;
    public code: string;
    public esppObject: string;
    public processId: number;
    public isActive: boolean;
    itsmProcessId: number;
    public approvalSetup: ApprovingItem[]

    constructor(subprocess: SubprocessConstructor) {
        super()
        this.title = subprocess.title;
        this.code = subprocess.code;
        this.esppObject = subprocess.esppObject;
        this.processId = subprocess.processId;
        this.isActive = subprocess.isActive;
        this.itsmProcessId = subprocess.itsmProcessId;
        this.approvalSetup = subprocess.approvalSetup;
    }
}