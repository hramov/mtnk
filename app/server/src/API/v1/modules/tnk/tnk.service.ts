import {Inject, Injectable} from '@nestjs/common';
import {
    TNK_REPOSITORY
} from "../../common/persistent/repository/repository.constants";
import {EVENT_BUS} from "../../common/constants";
import {tnkFactory} from "../../../../Core/Tnk/TnkFactory";
import {Ip} from "../../../../Shared/src/ValueObject/Objects/Ip";
import {TnkEventRepository} from "../../common/persistent/repository/event/tnk.repository";
import {IEventBus} from "../../../../Core/IEventBus";
import {TnkDto} from "./dto/tnk.dto";
import {ILogger} from "../../../../Core/ICore";
import {TnkConstructor} from "../../../../Core/Tnk/Tnk";
import {DatabaseError} from "../../error/Database.error";
import {ConfigItemDto} from "./dto/configItem.dto";
import {ConfigItem} from "../../../../Core/Tnk/ValueObject/ConfigItem";
import {WorkGroup} from "../../../../Core/Tnk/ValueObject/Workgroup";
import {Operation} from "../../../../Core/Tnk/ValueObject/Operation";
import {WorkGroupDto} from "./dto/workGroup.dto";
import {OperationDto} from "./dto/operation.dto";

@Injectable()
export class TnkService {
    constructor(
        @Inject('CustomLogger') private readonly logger: ILogger,
        @Inject(TNK_REPOSITORY) private readonly tnkRepository: TnkEventRepository,
        @Inject(EVENT_BUS) private readonly eventBus: IEventBus
    ) {}

    private tnkMapper(dto: TnkDto): TnkConstructor {
        return {
            title: dto.title,
            isActive: dto.isActive,
            isDigital: dto.isDigital,
            isAutomated: dto.isAutomated,
            status: dto.status,
            type: dto.type,
            processId: dto.processId,
            subprocessId: dto.subprocessId,
        };
    }

    async create(dto: TnkDto, userId: string, userIp: Ip) {
        const tnk = tnkFactory(this.logger, this.eventBus);
        tnk.load(this.tnkMapper(dto));
        return tnk.create(userId, userIp);
    }

    async getById(tnkId: string) {
        return this.tnkRepository.getByAggregateId(tnkId);
    }

    async update(dto: TnkDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkRepository.getByAggregateId(tnkId);

        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.logger, this.eventBus);
        tnk.load(currentTnk);
        return tnk.update(this.tnkMapper(dto), tnkId, userId, userIp);
    }

    async addConfigItem(dto: ConfigItemDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.logger, this.eventBus);
        tnk.load(currentTnk);
        return tnk.addConfigItem(new ConfigItem(tnkId, dto.title), tnkId, userId, userIp);
    }

    async addWorkGroup(dto: WorkGroupDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.logger, this.eventBus);
        tnk.load(currentTnk);
        return tnk.addWorkGroup(new WorkGroup(tnkId, dto.title), tnkId, userId, userIp);
    }

    async addOperation(dto: OperationDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.logger, this.eventBus);
        tnk.load(currentTnk);
        return tnk.addOperation(new Operation({
            tnkId: tnkId,
            referenceOperationId: dto.referenceOperationId,
            amount: dto.amount,
            title: dto.title,
            sortOrder: dto.sortOrder,
            assignee: dto.assignee
        }), tnkId, userId, userIp);
    }
}
