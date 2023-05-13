import {Inject, Injectable} from '@nestjs/common';
import {TokenData} from "../../../../Core/User/ValueObject/TokenData";
import {ApproveData} from "../../../../Core/Tnk/ValueObject/ApproveData";
import {
    DICTIONARY_REPOSITORY,
    PROCESS_REPOSITORY, SUBPROCESS_REPOSITORY,
    TNK_REPOSITORY
} from "../../common/persistent/repository/repository.constants";
import {ITnkRepository} from "../../../../Core/Tnk/ITnkRepository";
import {TnkBody} from "../../../../Core/Tnk/ValueObject/TnkBody";
import {ConfigItem} from "../../../../Core/Tnk/Entity/ConfigItem";
import {Tnk} from "../../../../Core/Tnk/Tnk";
import {DatabaseError} from "../../error/Database.error";
import {WorkGroup} from "../../../../Core/Tnk/Entity/Workgroup";
import {Operation} from "../../../../Core/Tnk/Entity/Operation";
import {TnkSearchParams} from "../../../../Core/Tnk/ValueObject/TnkSearchParams";
import {SearchTnkSpecification} from "../../../../Core/Tnk/Specification/SearchTnkSpecification";
import {IDictionaryRepository} from "../../../../Core/IDictionaryRepository";
import {Subprocess} from "../../../../Core/Tnk/Entity/Subprocess";
import {Process} from "../../../../Core/Tnk/Entity/Process";
import {IProcessRepository, ProcessSearchParams} from "../../../../Core/Tnk/IProcessRepository";
import {ISubprocessRepository} from "../../../../Core/Tnk/ISubprocessRepository";

@Injectable()
export class TnkService {

    constructor(
        @Inject(TNK_REPOSITORY) private readonly tnkRepository: ITnkRepository,
        @Inject(PROCESS_REPOSITORY) private readonly processRepository: IProcessRepository,
        @Inject(SUBPROCESS_REPOSITORY) private readonly subprocessRepository: ISubprocessRepository,
        @Inject(DICTIONARY_REPOSITORY) private readonly dictRepository: IDictionaryRepository) {}

    async create(dto: TnkBody) {
        const tnk = new Tnk();
        tnk.title = dto.title;
        tnk.type = dto.type;
        tnk.isActive = dto.isActive;
        tnk.isDigital = dto.isDigital;
        tnk.isAutomated = dto.isAutomated;
        tnk.statusId = dto.statusId;
        const subprocess = await this.dictRepository.getSubprocess(dto.subprocessId);
        if (subprocess instanceof DatabaseError) {
            tnk.subprocess = new Subprocess()
        } else {
            tnk.subprocess = subprocess;
        }

        const process = await this.dictRepository.getProcess(dto.processId);
        if (process instanceof DatabaseError) {
            tnk.process = new Process()
        } else {
            tnk.process = process;
        }
        return this.tnkRepository.create(tnk);
    }

    async update(dto: TnkBody, id: number) {
        const tnk = await this.tnkRepository.findOne(id);
        if (tnk instanceof DatabaseError) {
            return tnk;
        }
        tnk.title = dto.title;
        tnk.type = dto.type;
        tnk.isActive = dto.isActive;
        tnk.isDigital = dto.isDigital;
        tnk.isAutomated = dto.isAutomated;
        tnk.statusId = dto.statusId;
        const subprocess = await this.dictRepository.getSubprocess(dto.subprocessId);
        if (subprocess instanceof DatabaseError) {
            tnk.subprocess = new Subprocess()
        } else {
            tnk.subprocess = subprocess;
        }

        const process = await this.dictRepository.getProcess(dto.processId);
        if (process instanceof DatabaseError) {
            tnk.process = new Process()
        } else {
            tnk.process = process;
        }
        return this.tnkRepository.update(tnk);
    }

    async addConfigItem(title: string, tnkId: number): Promise<Tnk | DatabaseError> {
        const configItem = new ConfigItem()
        configItem.tnkId = tnkId;
        configItem.title = title;
        configItem.isActive = true;
        const tnk = await this.tnkRepository.findOne(tnkId);
        if (tnk instanceof DatabaseError) {
            return tnk;
        }
        tnk.configItems = [...tnk.configItems, configItem]
        return this.tnkRepository.update(tnk);
    }

    async addWorkGroup(title: string, tnkId: number): Promise<Tnk | DatabaseError> {
        const workGroup = new WorkGroup()
        workGroup.tnkId = tnkId;
        workGroup.title = title;
        workGroup.isActive = true;
        const tnk = await this.tnkRepository.findOne(tnkId);
        if (tnk instanceof DatabaseError) {
            return tnk;
        }
        tnk.workGroups = [...tnk.workGroups, workGroup]
        return this.tnkRepository.update(tnk);
    }

    async addOperation(title: string, tnkId: number): Promise<Tnk | DatabaseError> {
        const operation = new Operation()
        operation.tnkId = tnkId;
        operation.title = title;
        operation.isActive = true;

        const tnk = await this.tnkRepository.findOne(tnkId);
        if (tnk instanceof DatabaseError) {
            return tnk;
        }
        tnk.operations = [...tnk.operations, operation]
        return this.tnkRepository.update(tnk);
    }

    async search(searchParams: TnkSearchParams): Promise<Tnk[] | DatabaseError> {
        const searchTnkSpecification = new SearchTnkSpecification(searchParams);
        return this.tnkRepository.find(searchTnkSpecification);
    }

    async show(tnkId: number): Promise<Tnk | DatabaseError> {
        return this.tnkRepository.findOne(tnkId);
    }

    async approve(user: TokenData, dto: ApproveData): Promise<number | Error> {
        return null;
    }

    async getTnkToApprove(user: TokenData): Promise<number | Error> {
        return null;
    }

    async getProcesses(params: ProcessSearchParams) {
        const processes = await this.processRepository.find(params);
        if (processes instanceof Error) return processes;
        const result = [];
        for (const process of processes) {
            result.push(process.serialize())
        }
        return result;
    }

    async getSubprocesses() {
    }
}
