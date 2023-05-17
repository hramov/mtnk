import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import {ILogger} from "../../../../Core/ICore";
import {DICTIONARY_REPOSITORY} from "../../common/persistent/repository/repository.constants";
import {IDictionaryRepository} from "../../../../Core/IDictionaryRepository";
import {Process} from "../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../Core/Tnk/Entity/Subprocess";
import {ReferenceOperation} from "../../../../Core/Tnk/Entity/ReferenceOperation";
import {DatabaseError} from "../../error/Database.error";
import { LOGGER } from '../../common/constants';
import { UserJWTPayloadDto } from '../user/dto/userJWTPayload.dto';

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
            return new InternalServerErrorException(result.message, {
                cause: result
            })
        }
        return result;
    }

    async createSubprocess(user: UserJWTPayloadDto, dto: Subprocess) {
        const result = await this.repository.createSubprocess(dto, user.userId);
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException(result.message, {
                cause: result
            })
        }
        return result;
    }

    async updateSubprocess(user: UserJWTPayloadDto, dto: Subprocess, subprocessId: number) {
        const result = await this.repository.updateSubprocess(dto, user.userId, subprocessId);
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException(result.message, {
                cause: result
            })
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

    async getItsmProcess() {
        const result = await this.repository.getItsmProcess();
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException(result)
        }
        return result;
    }

}
