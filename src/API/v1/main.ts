import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { NextFunction } from 'express';
import {AppModule} from "./app.module";
import {Logger} from "../../Infrastructure/Logger/Logger";
import {ASYNC_STORAGE} from "./common/constants";
import {CustomLoggerService} from "./common/logger/custom-logger.service";
import {Uuid} from "../../Shared/src/ValueObject/Objects/Uuid";
config({
  path: '.env.local',
});

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);

  app.use((req: any, res: any, next: NextFunction) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    const traceId = req.headers['x-request-id'] || new Uuid().toString();
    const store = new Map<string, string>().set('traceId', traceId);
    asyncStorage.run(store, () => {
      next();
    });
  });

  app.useLogger(app.get<CustomLoggerService>('CustomLogger'));

  await app.listen(process.env.APP_PORT);
}

bootstrap();
