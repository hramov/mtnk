import {ApiProperty} from "@nestjs/swagger";
import {TnkType} from "../../../../../Core/Tnk/Entity/TnkType";
import {Status} from "../../../../../Core/Tnk/Entity/Status";

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
        example: 30,
        description: 'Стадия жизненного цикла ТНК'
    })
    status: Status;

    @ApiProperty({
        example: 'общий',
        description: 'Детализация ТНК'
    })
    type: TnkType;

    @ApiProperty({
        example: 34,
        description: 'Процесс ТНК'
    })
    processId: number;

    @ApiProperty({
        example: 56,
        description: 'Подпроцесс ТНК'
    })
    subprocessId: number;
}