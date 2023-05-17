import {BaseEntity} from "../../../Shared/src/BaseEntity";
import {ApprovingItem} from "../ValueObject/ApprovingItem";
import { ItsmProcess } from './ItsmProcess';

export type SubprocessConstructor = {
    processId: number;
    title: string;
    code: string;
    esppObject: string;
    isActive: boolean;
    itsmProcess: ItsmProcess;
    approvalSetup: ApprovingItem[]
}

export class Subprocess extends BaseEntity<number> {
    public title: string;
    public code: string;
    public esppObject: string;
    public processId: number;
    public isActive: boolean;
    public itsmProcess: ItsmProcess;
    public approvalSetup: ApprovingItem[]

    constructor(subprocess: SubprocessConstructor) {
        super()
        this.title = subprocess.title;
        this.code = subprocess.code;
        this.esppObject = subprocess.esppObject;
        this.processId = subprocess.processId;
        this.isActive = subprocess.isActive;
        this.itsmProcess = subprocess.itsmProcess;
        this.approvalSetup = subprocess.approvalSetup;
    }
}