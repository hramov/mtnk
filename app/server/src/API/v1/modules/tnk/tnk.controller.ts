import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import {TnkService} from "./tnk.service";
import {GetUser} from "../user/user.decorator";
import {Public} from "../user/public.decorator";
import {UserJWTPayloadDto} from "../user/dto/userJWTPayload.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {TnkDto} from "./dto/tnk.dto";
import {Uuid} from "../../../../Shared/src/ValueObject/Objects/Uuid";
import {Ip} from "../../../../Shared/src/ValueObject/Objects/Ip";
import {ConfigItem} from "../../../../Core/Tnk/ValueObject/ConfigItem";
import {ConfigItemDto} from "./dto/configItem.dto";
import {WorkGroupDto} from "./dto/workGroup.dto";
import {OperationDto} from "./dto/operation.dto";
import {ApprovingDto} from "./dto/approving.dto";
import { TnkSearchParams } from '../../../../Core/Tnk/ValueObject/TnkSearchParams';
import { DatabaseError } from '../../error/Database.error';
import { WrongTnkStatusError } from '../../../../Core/Tnk/Error/WrongTnkStatusError';

@Controller('tnk')
export class TnkController {
    constructor(private readonly tnkService: TnkService) {}

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Get('/')
    @ApiOperation({
        summary: 'Get tnk list'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async get(@GetUser() user: UserJWTPayloadDto, @Query() query: string) {
        const searchParams = new TnkSearchParams(25, 0);
        return this.tnkService.get(searchParams)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Get('/:id')
    @ApiOperation({
        summary: 'Get tnk by id'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async getById(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.getById(tnkId, user.userId)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Post('/')
    @ApiOperation({
        summary: 'Create new tnk'
    })
    @ApiResponse({
        status: 201,
    })
    @Public()
    async create(@GetUser() user: UserJWTPayloadDto, @Body() tnk: TnkDto) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.create(tnk, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id')
    @ApiOperation({
        summary: 'Update tnk'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async update(@GetUser() user: UserJWTPayloadDto, @Body() tnk: TnkDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        const result = await this.tnkService.update(tnk, tnkId, user.userId, user.userIp)
        if (result instanceof DatabaseError) {
            return new InternalServerErrorException('Ошибка работы с базой данных', {
                description: 'Возможно, производятся технические работы. Если ошибка не уходит очень долго, сообщите разработчику'
            })
        } else if (result instanceof WrongTnkStatusError) {
            return new BadRequestException(result.message, {
                cause: result,
                description: 'Необходимо удостовериться в статусе ТНК, если вам кажется, что все в порядке, сообщите разработчику'
            })
        }
        return result;
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/ci')
    @ApiOperation({
        summary: 'Add config item'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async addConfigItem(@GetUser() user: UserJWTPayloadDto, @Body() configItem: ConfigItemDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.addConfigItem(configItem, tnkId, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/wg')
    @ApiOperation({
        summary: 'Add config item'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async addWorkGroup(@GetUser() user: UserJWTPayloadDto, @Body() workGroup: WorkGroupDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.addWorkGroup(workGroup, tnkId, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/operation')
    @ApiOperation({
        summary: 'Add config item'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async addOperation(@GetUser() user: UserJWTPayloadDto, @Body() operation: OperationDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.addOperation(operation, tnkId, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/moveToApproving')
    @ApiOperation({
        summary: 'Move tnk to approving state'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async moveToApproving(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.moveToApproving(tnkId, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/approve')
    @ApiOperation({
        summary: 'Add config item'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async approve(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.approve(tnkId, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/decline')
    @ApiOperation({
        summary: 'Add config item',
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async decline(@GetUser() user: UserJWTPayloadDto, @Body() approving: ApprovingDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.decline(approving, tnkId, user.userId, user.userIp)
    }

    @ApiTags('Tnk')
    @ApiBearerAuth()
    @Put('/:id/moveToWithdrawn')
    @ApiOperation({
        summary: 'Move tnk to withdrawn state'
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async moveToWithdrawn(@GetUser() user: UserJWTPayloadDto, @Param('id') tnkId: string) {
        if (!user || !user.userId || !user.userIp) {
            user = {
                userId: 'USER-123',
                userIp: new Ip('127.0.0.1'),
                username: 'admin',
                role: 'admin'
            }
        }
        return this.tnkService.moveToWithdrawn(tnkId, user.userId, user.userIp)
    }
}
