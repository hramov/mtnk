import {WorkGroup} from "../ValueObject/Workgroup";

export interface AddedWorkGroupEvent {
    tnkId: number;
    workGroup: WorkGroup
    date: Date;
}