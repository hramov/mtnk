"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
let instance;
class FileHelper {
    constructor() {
        this.basePath = process.env.FILE_BASE_PATH;
        this.logsBasePath = process.env.LOGS_PATH;
        if (instance)
            return instance;
        this.checkDirs(this.logsBasePath).catch((err) => console.error(err));
        instance = this;
    }
    async checkDirs(dir) {
        try {
            await (0, promises_1.stat)((0, path_1.join)(this.basePath, dir));
        }
        catch (err) {
            await (0, promises_1.mkdir)((0, path_1.join)(this.basePath, dir), {
                recursive: true,
            });
        }
    }
    async open(filename) {
        try {
            return (0, promises_1.open)((0, path_1.join)(this.basePath, filename));
        }
        catch (err) {
            return err;
        }
    }
    async read(filename) {
        try {
            return (0, promises_1.readFile)((0, path_1.join)(this.basePath, filename), {
                encoding: 'utf-8',
            });
        }
        catch (err) {
            return err;
        }
    }
    async write(filename, data) {
        try {
            await (0, promises_1.writeFile)((0, path_1.join)(this.basePath, filename), data, {
                encoding: 'utf-8',
            });
        }
        catch (err) {
            return err;
        }
    }
    async append(filename, data) {
        try {
            await (0, promises_1.appendFile)((0, path_1.join)(this.basePath, filename), data, {
                encoding: 'utf-8',
            });
        }
        catch (err) {
            return err;
        }
    }
}
exports.FileHelper = FileHelper;
//# sourceMappingURL=FileHelper.js.map