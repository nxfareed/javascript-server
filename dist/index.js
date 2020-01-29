"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./patterns/index");
const index_2 = require("./patterns/index");
const index_3 = require("./utils/index");
const constants_1 = require("./constants");
index_1.diamond(5);
index_2.equilateral(4);
console.log(index_3.hasPermissions("getUsers", 'trainee', 'read'));
index_3.validateUser(constants_1.users);
//# sourceMappingURL=index.js.map