import {IBaseRepository} from "../Shared/src/IBaseRepository";
import {ReferenceOperation} from "./Tnk/Entity/ReferenceOperation";
import {Subprocess} from "./Tnk/Entity/Subprocess";
import {Process} from "./Tnk/Entity/Process";
import {DatabaseError} from "../API/v1/error/Database.error";
import { ItsmProcess } from './Tnk/Entity/ItsmProcess';

export interface IDictionaryRepository extends IBaseRepository {
    addOperations(operations: ReferenceOperation[]): Promise<void | DatabaseError>
    addProcesses(processes: Process[]): Promise<void | DatabaseError>
    addSubprocesses(subprocesses: Subprocess[]): Promise<void | DatabaseError>
    getProcess(processId: number): Promise<Process | DatabaseError>
    getSubprocess(subprocessId: number): Promise<Subprocess | DatabaseError>
    createSubprocess(dto: Subprocess, userId: string): Promise<number | DatabaseError>
    updateSubprocess(dto: Subprocess, userId: string, subprocessId: number): Promise<number | DatabaseError>
    getProcessList(): Promise<Process[] | DatabaseError>
    getSubprocessList(): Promise<Subprocess[] | DatabaseError>
    getOperationList(): Promise<ReferenceOperation[] | DatabaseError>
    getItsmProcess(): Promise<ItsmProcess[] | DatabaseError>
}