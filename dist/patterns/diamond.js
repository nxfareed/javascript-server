"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//let s = Number(process.argv[2]);
//diamond(s);
function diamond(o) {
    if (o < 11 && o > 1) {
        for (let j = 0; j < o; j++) {
            let c = " ";
            for (let k = 0; k < o - j; k++)
                c = c + " ";
            for (let l = 0; l <= j; l++)
                c = c + "* ";
            console.log(c);
        }
        for (let i = o - 1; i > 0; i--) {
            let c = " ";
            for (let j = 0; j < o - i; j++)
                c = c + " ";
            for (let k = 0; k < i; k++)
                c = c + " *";
            console.log(c);
        }
    }
    else {
        console.log("wrong input");
    }
}
exports.default = diamond;
//# sourceMappingURL=diamond.js.map