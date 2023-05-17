import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../user/public.decorator';
import { DictionaryService } from './dictionary.service';
import { GetUser } from '../user/user.decorator';
import { UserJWTPayloadDto } from '../user/dto/userJWTPayload.dto';
import { Subprocess } from '../../../../Core/Tnk/Entity/Subprocess';

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
	async getProcesses() {
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
	async getSubprocesses() {
		const data = await this.dictionaryService.getSubprocesses();
		if (data instanceof Error) {
			throw data;
		}
		return data;
	}

	@ApiTags('Dictionary')
	@ApiBearerAuth()
	@Post('/subprocess')
	@ApiOperation({
		summary: 'Create subprocess'
	})
	@ApiResponse({
		status: 201,
	})
	@Public()
	async createSubprocess(@GetUser() user: UserJWTPayloadDto, @Body() dto: Subprocess) {
		const data = await this.dictionaryService.createSubprocess(user, dto);
		if (data instanceof Error) {
			throw data;
		}
		return data;
	}

	@ApiTags('Dictionary')
	@ApiBearerAuth()
	@Put('/subprocess/:id')
	@ApiOperation({
		summary: 'Update subprocess'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async updateSubprocess(@GetUser() user: UserJWTPayloadDto, @Body() dto: Subprocess, @Param('id') subprocessId: number) {
		const data = await this.dictionaryService.updateSubprocess(user, dto, subprocessId);
		if (data instanceof Error) {
			throw data;
		}
		return data;
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
	async getOperations() {
		return this.dictionaryService.getOperations()
	}

	@ApiTags('ITSM Process')
	@ApiBearerAuth()
	@Get('/itsmProcess')
	@ApiOperation({
		summary: 'Get list of ITSM processes'
	})
	@ApiResponse({
		status: 200,
	})
	@Public()
	async getItsmProcess() {
		return this.dictionaryService.getItsmProcess()
	}
}
