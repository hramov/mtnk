import { Inject, Injectable } from '@nestjs/common';
import {
    SUBPROCESS_REPOSITORY,
    TNK_EVENT_REPOSITORY,
    TNK_REPOSITORY,
} from '../../common/persistent/repository/repository.constants';
import { EVENT_BUS, LOGGER } from '../../common/constants';
import { tnkFactory } from '../../../../Core/Tnk/TnkFactory';
import { Ip } from '../../../../Shared/src/ValueObject/Objects/Ip';
import { IEventBus } from '../../../../Core/IEventBus';
import { TnkDto } from './dto/tnk.dto';
import { ILogger } from '../../../../Core/ICore';
import { TnkConstructor } from '../../../../Core/Tnk/Tnk';
import { DatabaseError } from '../../../../Core/Error/Database.error';
import { ConfigItemDto } from './dto/configItem.dto';
import { ConfigItem } from '../../../../Core/Tnk/ValueObject/ConfigItem';
import { WorkGroup } from '../../../../Core/Tnk/ValueObject/Workgroup';
import { Operation } from '../../../../Core/Tnk/ValueObject/Operation';
import { WorkGroupDto } from './dto/workGroup.dto';
import { OperationDto } from './dto/operation.dto';
import { ApprovingItem } from '../../../../Core/Tnk/ValueObject/ApprovingItem';
import { ApprovingDto } from './dto/approving.dto';
import { ISubprocessRepository } from '../../../../Core/Tnk/Repository/ISubprocessRepository';
import { Uuid } from '../../../../Shared/src/ValueObject/Objects/Uuid';
import { TnkSearchParams } from '../../../../Core/Tnk/ValueObject/TnkSearchParams';
import { ITnkRepository } from '../../../../Core/Tnk/Repository/ITnkRepository';
import { ITnkEventRepository } from '../../../../Core/Tnk/Repository/event/ITnkEventRepository';
import { Status } from '../../../../Core/Tnk/Entity/Status';
import { TnkStatuses } from '../../../../Core/Constants';

@Injectable()
export class TnkService {
    constructor(
        @Inject(LOGGER) private readonly logger: ILogger,
        @Inject(TNK_EVENT_REPOSITORY) private readonly tnkEventRepository: ITnkEventRepository,
        @Inject(TNK_REPOSITORY) private readonly tnkRepository: ITnkRepository,
        @Inject(SUBPROCESS_REPOSITORY) private readonly subprocessRepository: ISubprocessRepository,
        @Inject(EVENT_BUS) private readonly eventBus: IEventBus
    ) {}

    private static tnkMapper(dto: TnkDto): TnkConstructor {
        return {
            tnkId: 'TNK-' + new Uuid().toString(),
            title: dto.title,
            isActive: dto.isActive,
            isDigital: dto.isDigital,
            isAutomated: dto.isAutomated,
            status: null,
            type: dto.type,
            process: dto.process,
            subprocess: dto.subprocess,
        };
    }

    async get(searchParams: TnkSearchParams) {
        return this.tnkRepository.find(searchParams);
    }

    async getById(tnkId: string, userId: string) {
        const tnk = await this.tnkEventRepository.getByAggregateId(tnkId);

        // TODO add user privileges
        return tnk;
    }

    async create(dto: TnkDto, userId: string, userIp: Ip) {
        const tnk = tnkFactory(this.tnkEventRepository);

        const subprocess = await this.subprocessRepository.findOne(dto.subprocess.id);
        if (subprocess instanceof DatabaseError) {
            this.logger.error(subprocess.message, 'TnkService', subprocess.stack, {
                method: 'create',
            });
            return subprocess;
        }

        tnk.load(TnkService.tnkMapper(dto));
        tnk.status = new Status('Новая', TnkStatuses.New);
        const result = await tnk.create(userId, userIp, subprocess.approvalSetup);
        if (result instanceof Error) {
            this.logger.error(result.message, 'TnkService', result.stack, {
                method: 'create',
            });
            return result;
        }

        const reportResult = await this.tnkRepository.create(tnk, userId, userIp);
        if (reportResult instanceof Error) {
            this.logger.error(result.message, 'TnkService', result.stack, {
                method: 'create',
            });
        }
        return reportResult;
    }

    async update(dto: TnkDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);

        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);

        if (tnk.subprocess.id !== dto.subprocess.id) {

            const subprocess = await this.subprocessRepository.findOne(dto.subprocess.id);
            if (subprocess instanceof DatabaseError) {
                return subprocess;
            }

            const result = await tnk.updateWithChangingSubprocess(TnkService.tnkMapper(dto), tnkId, userId, userIp, subprocess.approvalSetup);
            if (result instanceof Error) {
                this.logger.warn(result.message, 'TnkService', {
                    method: 'updateWithChangingSubprocess',
                    tnkId: tnkId,
                    userId: userId,
                    userIp: userIp.toString(),
                });
                return result;
            }
        } else {
            const result = await tnk.update(TnkService.tnkMapper(dto), tnkId, userId, userIp);
            if (result instanceof Error) {
                this.logger.warn(result.message, 'TnkService', {
                    method: 'update',
                    tnkId: tnkId,
                    userId: userId,
                    userIp: userIp.toString(),
                });
                return result;
            }
        }

        const reportResult = await this.tnkRepository.update(tnk);
        if (reportResult instanceof Error) {
            this.logger.error(reportResult.message, 'TnkService', reportResult.stack, {
                method: 'update',
            });
        }
        return reportResult;
    }

    async addConfigItem(dto: ConfigItemDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);
        return tnk.addConfigItem(new ConfigItem(tnkId, dto.title), tnkId, userId, userIp);
    }

    async addWorkGroup(dto: WorkGroupDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);
        return tnk.addWorkGroup(new WorkGroup(tnkId, dto.title), tnkId, userId, userIp);
    }

    async addOperation(dto: OperationDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
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

    async moveToApproving(tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);
        const result = await tnk.moveToApproving(tnkId, userId, userIp);

        if (result instanceof Error) {
            this.logger.error(result.message, 'TnkService', result.stack, {
                method: 'moveToApproving',
            });
            return result;
        }

        currentTnk.status = new Status("На согласовании", TnkStatuses.Approving);
        const reportResult = await this.tnkRepository.update(currentTnk);
        if (reportResult instanceof Error) {
            this.logger.error(reportResult.message, 'TnkService', reportResult.stack, {
                method: 'moveToApproving',
            });
        }
    }

    async approve(tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const subprocess = await this.subprocessRepository.findOne(currentTnk.subprocess.id);
        if (subprocess instanceof DatabaseError) {
            return subprocess;
        }

        currentTnk.subprocess.approvalSetup = subprocess.approvalSetup;

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);
        const result = await tnk.approve(tnkId, userId, userIp);
        if (result.result instanceof Error) {
            this.logger.error(result.result.message, 'TnkService', result.result.stack, {
                method: 'approve',
            });
            return result.result;
        }

        if (result.isApproved) {
            currentTnk.status = new Status('Утверждена', TnkStatuses.Approved);
            const reportResult = await this.tnkRepository.update(currentTnk);
            if (reportResult instanceof Error) {
                this.logger.error(reportResult.message, 'TnkService', reportResult.stack, {
                    method: 'approve',
                });
            }
        }
    }

    async decline(dto: ApprovingDto, tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);

        const result = await tnk.decline(new ApprovingItem({
            tnkId: tnkId,
            userId: userId,
            groupNum: dto.groupNum,
            isActive: dto.isActive,
            isApproved: false,
            comments: dto.comments,
        }), tnkId, userId, userIp);
        if (result instanceof Error) {
            this.logger.error(result.message, 'TnkService', result.stack, {
                method: 'decline',
            });
            return result;
        }

        currentTnk.status = new Status('На доработке', TnkStatuses.Modified);
        const reportResult = await this.tnkRepository.update(currentTnk);
        if (reportResult instanceof Error) {
            this.logger.error(reportResult.message, 'TnkService', reportResult.stack, {
                method: 'decline',
            });
        }
    }

    async moveToWithdrawn(tnkId: string, userId: string, userIp: Ip) {
        const currentTnk = await this.tnkEventRepository.getByAggregateId(tnkId);
        if (currentTnk instanceof DatabaseError) {
            return currentTnk;
        }

        const tnk = tnkFactory(this.tnkEventRepository);
        tnk.load(currentTnk);
        const result = await tnk.moveToWithdrawn(tnkId, userId, userIp);
        if (result instanceof Error) {
            this.logger.error(result.message, 'TnkService', result.stack, {
                method: 'moveToWithdrawn',
            });
            return result;
        }

        currentTnk.status = new Status('Выведена', TnkStatuses.Withdrawn);
        const reportResult = await this.tnkRepository.update(currentTnk);
        if (reportResult instanceof Error) {
            this.logger.error(reportResult.message, 'TnkService', reportResult.stack, {
                method: 'moveToWithdrawn',
            });
        }
    }
}
