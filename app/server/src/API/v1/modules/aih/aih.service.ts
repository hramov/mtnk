import { Inject, Injectable } from '@nestjs/common';
import { LOGGER } from '../../common/constants';
import { ILogger } from '../../../../Core/ICore';
import { AIH_REPOSITORY } from '../../common/persistent/repository/repository.constants';
import { IAihRepository } from '../../../../Core/Tnk/Repository/IAihRepository';

@Injectable()
export class AihService {

	constructor(
		@Inject(LOGGER) private readonly logger: ILogger,
		@Inject(AIH_REPOSITORY) private readonly repository: IAihRepository
	) {}

	async getWorkGroups() {

	}

	async getConfigItems() {

	}
}