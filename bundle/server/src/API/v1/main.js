"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const dotenv_1 = require("dotenv");
const app_module_1 = require("./app.module");
const Logger_1 = require("../../Infrastructure/Logger/Logger");
const constants_1 = require("./common/constants");
const Uuid_1 = require("../../Shared/src/ValueObject/Objects/Uuid");
(0, dotenv_1.config)({
    path: '.env.local',
});
async function bootstrap() {
    const logger = new Logger_1.Logger('Main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logger,
    });
    app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);
    app.use((req, res, next) => {
        const asyncStorage = app.get(constants_1.ASYNC_STORAGE);
        const traceId = req.headers['x-request-id'] || new Uuid_1.Uuid().toString();
        const store = new Map().set('traceId', traceId);
        asyncStorage.run(store, () => {
            next();
        });
    });
    app.useLogger(app.get('CustomLogger'));
    await app.listen(process.env.APP_PORT);
}
bootstrap().catch((err) => console.error(err));
//# sourceMappingURL=main.js.map