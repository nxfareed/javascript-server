"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./../constants");
function hasPermissions(module, role, permissionType) {
    const k = constants_1.permissions[module];
    const b = k[permissionType];
    return b.some(element => {
        return element === role;
    });
}
exports.default = hasPermissions;
// console.log(hasPermissions('getUsers', 'trainer', 'write'));
//# sourceMappingURL=permissions.js.map