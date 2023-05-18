import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AihService } from './aih.service';
import { Public } from '../user/public.decorator';

@Controller('aih')
export class AihController {
	constructor(private readonly aihService: AihService) {}

	@ApiTags('Aih')
	@ApiBearerAuth()
	@Get('/wg')
	@ApiOperation({
		summary: 'Get list of available work groups'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async getWorkGroups() {
		return this.aihService.getWorkGroups()
	}

	@ApiTags('Aih')
	@ApiBearerAuth()
	@Get('/ci')
	@ApiOperation({
		summary: 'Get list of available configuration items'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async getConfigItems() {
		return this.aihService.getConfigItems()
	}
}