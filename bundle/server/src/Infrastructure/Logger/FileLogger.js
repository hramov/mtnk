"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
const path_1 = require("path");
const FileHelper_1 = require("../FileHelper/FileHelper");
class FileLogger {
    constructor() {
        this.fileHelper = new FileHelper_1.FileHelper();
        this.logsPath = process.env.LOGS_PATH;
    }
    createLogsFileName() {
        const dt = new Date();
        return dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate();
    }
    async write(msg, stack) {
        const result = await this.fileHelper.append((0, path_1.join)(this.logsPath, this.createLogsFileName()), msg + ',\n');
        if (result instanceof Error) {
            return result;
        }
        return true;
    }
}
exports.FileLogger = FileLogger;
//# sourceMappingURL=FileLogger.js.map