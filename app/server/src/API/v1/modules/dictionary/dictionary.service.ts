import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import {ILogger} from "../../../../Core/ICore";
import {DICTIONARY_REPOSITORY} from "../../common/persistent/repository/repository.constants";
import {IDictionaryRepository} from "../../../../Core/IDictionaryRepository";
import {Process} from "../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../Core/Tnk/Entity/Subprocess";
import {ReferenceOperation} from "../../../../Core/Tnk/Entity/ReferenceOperation";
import {DatabaseError} from "../../error/Database.error";
import { LOGGER } from '../../common/constants';

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
        @Inject(LOGGER) private readonly logger: ILogger,
        @Inject(DICTIONARY_REPOSITORY) private readonly repository: IDictionaryRepository
    ) {}


    async getProcesses() {
        const result = await this.repository.getProcessList();
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException(result)
        }
        return result;
    }

    async getSubprocesses() {
        const result = await this.repository.getSubprocessList();
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException(result)
        }
        return result;
    }

    async getOperations() {
        const result = await this.repository.getOperationList();
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException(result)
        }
        return result;
    }

}
