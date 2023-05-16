import {ApiProperty} from "@nestjs/swagger";
import {TnkType} from "../../../../../Core/Tnk/Entity/TnkType";
import {Status} from "../../../../../Core/Tnk/Entity/Status";
import {Process} from "../../../../../Core/Tnk/Entity/Process";
import {Subprocess} from "../../../../../Core/Tnk/Entity/Subprocess";

export class TnkDto {

    @ApiProperty({
        example: 'Title',
        description: 'Название ТНК'
    })
    title: string;

    @ApiProperty({
        example: true,
        description: 'Активность ТНК'
    })
    isActive: boolean;

    @ApiProperty({
        example: true,
        description: 'Реализация цифровыми сервисами'
    })
    isDigital: boolean;

    @ApiProperty({
        example: true,
        description: 'Используется ли автоматизация (да | нет)'
    })
    isAutomated: boolean;

    @ApiProperty({
        example: {
            title: 'Общий'
        },
        description: 'Детализация ТНК'
    })
    type: TnkType;

    @ApiProperty({
        example: {
            id: 34,
            title: 'Процесс 1',
            code: 'ПР-1',
            isActive: true,
        },
        description: 'Процесс ТНК'
    })
    process: Process;

    @ApiProperty({
        example: {
            id: 56,
            title: 'Подпроцесс 1',
            code: 'СП-1',
            esppObject: 'Объект 1',
            isActive: true,
        },
        description: 'Подпроцесс ТНК'
    })
    subprocess: Subprocess;
}