"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*check if the anagram in the topten and update the top ten*/
const updateTopTen = (anagram, AnagramsTopTen) => {
    for (const a of AnagramsTopTen) {
        /*if the anagram is already in the top ten*/
        if (a.word === anagram.word) {
            a.times = anagram.times;
            AnagramsTopTen.sort(compareAnagrams);
            return true;
        }
    }
    /*if there are less then 10 anagrams*/
    if (AnagramsTopTen.length < 10) {
        AnagramsTopTen.push(anagram);
        AnagramsTopTen.sort(compareAnagrams);
        return true;
    }
    /*if the anagram is not in top ten*/
    if (anagram.times > AnagramsTopTen[AnagramsTopTen.length - 1].times) {
        AnagramsTopTen.push(anagram);
        AnagramsTopTen.sort(compareAnagrams);
        AnagramsTopTen.pop();
        return true;
    }
    return false;
};
const compareAnagrams = (a, b) => {
    return b.times - a.times;
};
exports.default = updateTopTen;
//# sourceMappingURL=updateTopTen.js.map