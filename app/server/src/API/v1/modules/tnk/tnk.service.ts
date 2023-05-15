import {Inject, Injectable} from '@nestjs/common';
import {
    DICTIONARY_REPOSITORY,
    PROCESS_REPOSITORY,
    SUBPROCESS_REPOSITORY,
    TNK_REPOSITORY
} from "../../common/persistent/repository/repository.constants";
import {ITnkRepository} from "../../../../Core/Tnk/Repository/ITnkRepository";
import {IDictionaryRepository} from "../../../../Core/IDictionaryRepository";
import {IProcessRepository} from "../../../../Core/Tnk/Repository/IProcessRepository";
import {ISubprocessRepository} from "../../../../Core/Tnk/Repository/ISubprocessRepository";
import {EVENT_BUS} from "../../common/constants";
import {IEventBus} from "../../../../Core/IEventBus";
import {tnkFactory} from "../../../../Core/Tnk/TnkFactory";
import {TnkConstructor} from "../../../../Core/Tnk/Tnk";

@Injectable()
export class TnkService {

    constructor(
        @Inject(TNK_REPOSITORY) private readonly tnkRepository: ITnkRepository,
        @Inject(PROCESS_REPOSITORY) private readonly processRepository: IProcessRepository,
        @Inject(SUBPROCESS_REPOSITORY) private readonly subprocessRepository: ISubprocessRepository,
        @Inject(DICTIONARY_REPOSITORY) private readonly dictRepository: IDictionaryRepository,
        @Inject(EVENT_BUS) private readonly eventBus: IEventBus) {}

    async create(dto: TnkConstructor) {
        const tnk = tnkFactory(this.eventBus);
        tnk.load(dto);
        return tnk.save();
    }
}
