"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*check if two words are anagram, words must be all in lowercase*/
const isAnagram = (wordA, wordB) => {
    return wordA.split('').reverse().join('') === wordB;
};
exports.default = isAnagram;
//# sourceMappingURL=isAnagram.js.map