"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginOrPasswordIncorrectException = void 0;
const common_1 = require("@nestjs/common");
function LoginOrPasswordIncorrectException(error) {
    return new common_1.HttpException({
        status: common_1.HttpStatus.FORBIDDEN,
        error: error.message,
    }, common_1.HttpStatus.FORBIDDEN, {
        cause: error,
    });
}
exports.LoginOrPasswordIncorrectException = LoginOrPasswordIncorrectException;
//# sourceMappingURL=LoginOrPasswordIncorrectHttp.error.js.map