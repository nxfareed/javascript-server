"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateEmail(email) {
    const regex = /([a-zA-Z0-9\+_.@])+@successive.tech/gm;
    const result = regex.test(email);
    return result;
}
exports.validateEmail = validateEmail;
//# sourceMappingURL=helpers.js.map