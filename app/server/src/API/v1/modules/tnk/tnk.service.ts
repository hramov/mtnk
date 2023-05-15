import {Inject, Injectable} from '@nestjs/common';
import {
    TNK_REPOSITORY
} from "../../common/persistent/repository/repository.constants";
import {EVENT_BUS} from "../../common/constants";
import {tnkFactory} from "../../../../Core/Tnk/TnkFactory";
import {TnkConstructor} from "../../../../Core/Tnk/Tnk";
import {Uuid} from "../../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../../Shared/src/ValueObject/Objects/Ip";
import {TnkEventRepository} from "../../common/persistent/repository/event/tnk.repository";
import {IEventBus} from "../../../../Core/IEventBus";

@Injectable()
export class TnkService {
    constructor(
        @Inject(TNK_REPOSITORY) private readonly tnkRepository: TnkEventRepository,
        @Inject(EVENT_BUS) private readonly eventBus: IEventBus
    ) {}

    async create(dto: TnkConstructor, userId: Uuid, userIp: Ip) {
        const tnk = tnkFactory(this.eventBus);
        tnk.load(dto);
        return tnk.create(userId, userIp);
    }
}
