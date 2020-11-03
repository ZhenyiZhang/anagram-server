"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkWord = (word) => {
    if (word.length === 0)
        return false;
    if (!/^[a-zA-Z]+$/.test(word))
        return false;
    if (word.length > 50)
        return false;
    return true;
};
exports.default = checkWord;
//# sourceMappingURL=checkWord.js.map