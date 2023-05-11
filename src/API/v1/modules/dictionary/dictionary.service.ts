import {Inject, Injectable} from '@nestjs/common';
import {ILogger} from "../../../../Core/ICore";
import {USER_REPOSITORY} from "../../common/database/repository/repository.constants";
import {IDictionaryRepository} from "../../../../Core/IDictionaryRepository";
import {Operation} from "../../../../Core/Tnk/Entity/Operation";
import {Process} from "../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../Core/Tnk/Entity/Subprocess";
import {ReferenceOperation} from "../../../../Core/Tnk/Entity/ReferenceOperation";

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
        @Inject(USER_REPOSITORY) private readonly repository: IDictionaryRepository
    ) {}

    async getActiveRoles() {
        return this.repository.getActiveRoles();
    }

    async getAllDictItems() {
        return this.repository.getAllDictItems();
    }

    async getEditableDictTypes() {
        return this.repository.getEditableDictTypes();
    }

    async appendRow(dictType, row, userId, procs) {
        if (dictType === 'oper') {
            return await this.appendRowCommon(dictType, row, userId, 0);
        } else if (dictType === 'proc') {
            return await this.appendRowCommon(dictType, row, userId, null);
        } else if (dictType === 'subproc') {
            return await this.appendRowCommon(
                dictType,
                row,
                userId,
                null,
                procs,
            );
        }
        return '';
    }

    async appendRowCommon(dictType, row, userId, defaultVal, procs) {
        let p = row[1] ? `'${row[1].trim()}'` : defaultVal;
        let isRecExist = await querySync({
            q: SQLS[dictType].isExist,
            m: [row[0]],
        });
        this.throwIsError(isRecExist, 'Ошибка при поиске ' + dictType + '. ');
        if (!isRecExist.data || !isRecExist.data[0]) {
            if (dictType === 'subproc') {
                return this.appendRowSubproc(row, userId, p, procs);
            } else {
                return `('${row[0]}', ${p}, true, '${userId}'),`;
            }
        }
        return '';
    }

    async appendRowSubproc(row, userId, p, procs) {
        if (row[2]) {
            //если передали имя процесса, а то мало ли, могли и не дописать
            let procName = row[2].trim();
            let procId = procs[procName];
            if (!procId) {
                let proc = await querySync({
                    q: SQLS.proc.isExist,
                    m: [procName],
                });
                this.throwIsError(proc, 'Ошибка при поиске процесса. ');
                if (proc.data && proc.data[0] && proc.data[0].id) {
                    procId = proc.data[0].id;
                    procs[procName] = procId;
                } else {
                    throw {
                        message: `Не найден Процесс "${procName}". Загрузка невозможна. Исправьте данные и повторите попытку. `,
                    };
                }
            }
            if (procId) {
                return `('${row[0]}', ${p}, true, '${userId}', ${procId}),`;
            }
        }
    }

    async importDictionaries(params: ImportDictionary, account_id) {
            const rows = params.rows.split('\n');

            const operations: ReferenceOperation[] = [];
            const processes: Process[] = [];
            const subprocesses: Subprocess[] = [];

            for (const row of rows) {
                const cols = row.split(';').map((item, idx) => idx === 0 ? item.trim() : item);

                switch(params.type) {
                    case DictionaryType.Operation:
                        const operation = new ReferenceOperation()
                        operation.title = cols[0];
                        operation.duration = Number(cols[1]);
                        operation.unitId = Number(cols[2]);
                        operation.sourceId = Number(cols[3]);
                        operation.blockId = Number(cols[4]);
                        operation.docNum = Number(cols[5]);
                        operations.push(operation)
                    case DictionaryType.Process:
                        const process = new Process()
                        process.title = cols[0];
                        process.code = cols[1];
                    case DictionaryType.Subprocess:
                        const subprocess = new Subprocess()
                        subprocess.title = cols[0];
                        subprocess.title = cols[0];
                        subprocess.title = cols[0];
                        subprocess.title = cols[0];
                }

            }

        switch(params.type) {
            case DictionaryType.Operation:
                this.repository.addOperations(operations)
            case DictionaryType.Process:
                this.repository.addProcesses(processes)
            case DictionaryType.Subprocess:
                this.repository.addSubprocesses(subprocesses)
        }

        //     for (let i = 0; i < rows.length; i++) {
        //         if (rows[i]) {
        //
        //                     vals += await this.appendRow(
        //                         params.type,
        //                         row,
        //                         account_id,
        //                         procs,
        //                     );
        //                 } catch (err) {
        //                     return {
        //                         error: err,
        //                         data: null,
        //                     };
        //                 }
        //             }
        //         }
        //     }
        //     vals = vals.slice(0, -1); //удаление последней лишней запятой в списке параметров
        //     if (vals) {
        //         result = await querySync(SQLS[params.type].insert + vals);
        //     }
        //
        // return result;
    }

}
