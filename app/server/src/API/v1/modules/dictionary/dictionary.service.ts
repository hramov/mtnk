import {Inject, Injectable} from '@nestjs/common';
import {ILogger} from "../../../../Core/ICore";
import {DICTIONARY_REPOSITORY} from "../../common/persistent/repository/repository.constants";
import {IDictionaryRepository} from "../../../../Core/IDictionaryRepository";
import {Process} from "../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../Core/Tnk/Entity/Subprocess";
import {ReferenceOperation} from "../../../../Core/Tnk/Entity/ReferenceOperation";
import {DatabaseError} from "../../error/Database.error";

export const enum DictionaryType {
    Process,
    Subprocess,
    Operation
}

export interface ImportDictionary {
    rows: string;
    type: DictionaryType;
}

@Injectable()
export class DictionaryService {

    constructor(
        @Inject('CustomLogger') private readonly logger: ILogger,
        @Inject(DICTIONARY_REPOSITORY) private readonly repository: IDictionaryRepository
    ) {}

    // async getActiveRoles() {
    //     return this.repository.getActiveRoles();
    // }
    //
    // async getAllDictItems() {
    //     return this.repository.getAllDictItems();
    // }
    //
    // async getEditableDictTypes() {
    //     return this.repository.getEditableDictTypes();
    // }
    //
    // async importDictionaries(params: ImportDictionary, account_id) {
    //     let result: void | DatabaseError;
    //     const rows = params.rows.split('\n');
    //
    //     const operations: ReferenceOperation[] = [];
    //     const processes: Process[] = [];
    //     const subprocesses: Subprocess[] = [];
    //
    //     for (const row of rows) {
    //         const cols = row.split(';').map((item, idx) => idx === 0 ? item.trim() : item);
    //
    //         switch(params.type) {
    //             case DictionaryType.Operation:
    //                 const operation = new ReferenceOperation();
    //                 operation.title = cols[0];
    //                 operation.duration = Number(cols[1]);
    //                 operation.unitId = Number(cols[2]);
    //                 operation.sourceId = Number(cols[3]);
    //                 operation.blockId = Number(cols[4]);
    //                 operation.docNum = Number(cols[5]);
    //                 operations.push(operation)
    //             case DictionaryType.Process:
    //                 const process = new Process();
    //                 process.title = cols[0];
    //                 process.code = cols[1];
    //             case DictionaryType.Subprocess:
    //                 const subprocess = new Subprocess();
    //                 subprocess.title = cols[0];
    //                 subprocess.title = cols[0];
    //                 subprocess.title = cols[0];
    //                 subprocess.title = cols[0];
    //         }
    //
    //     }
    //
    //     switch(params.type) {
    //         case DictionaryType.Operation:
    //             result = await this.repository.addOperations(operations)
    //         case DictionaryType.Process:
    //             result = await this.repository.addProcesses(processes)
    //         case DictionaryType.Subprocess:
    //             result = await this.repository.addSubprocesses(subprocesses)
    //     }
    //
    //     return result;
    // }

}
