import { Module } from '@nestjs/common';
import {EVENT_BUS} from "../constants";
import Emitter from "events";

@Module({
    providers: [
        {
            provide: EVENT_BUS,
            useValue: new Emitter(),
        },
    ],
    exports: [EVENT_BUS],
})
export class EventBusModule {}
