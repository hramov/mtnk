import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../user/public.decorator';
import { GetUser } from '../user/user.decorator';
import { UserJWTPayloadDto } from '../user/dto/userJWTPayload.dto';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
	constructor(private readonly dictionaryService: DictionaryService) {}

	@ApiTags('Dictionary')
	@ApiBearerAuth()
	@Get('/process')
	@ApiOperation({
		summary: 'Get list of processes'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async getProcesses(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
		return this.dictionaryService.getProcesses()
	}

	@ApiTags('Dictionary')
	@ApiBearerAuth()
	@Get('/subprocess')
	@ApiOperation({
		summary: 'Get list of subprocesses'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async getSubprocesses(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
		return this.dictionaryService.getSubprocesses()
	}

	@ApiTags('Dictionary')
	@ApiBearerAuth()
	@Get('/operation')
	@ApiOperation({
		summary: 'Get list of operations'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async getOperations(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
		return this.dictionaryService.getOperations()
	}
}
