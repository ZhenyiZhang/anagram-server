"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateTopTen_1 = __importDefault(require("../functions/updateTopTen"));
const isAnagram_1 = __importDefault(require("../functions/isAnagram"));
const router = express_1.default.Router();
const AnagramsList = new Map();
const AnagramsTopTen = [];
router.post('/', (req, res) => {
    if (!req.body)
        return res.status(400).json({ Error: 'No Words Were Found in Request' });
    const anagram = req.body;
    if (!anagram)
        return res.status(400).json({ Error: 'Invalid Data Format' });
    /*convert words into lowercase*/
    anagram.wordA = anagram.wordA.toLowerCase();
    anagram.wordB = anagram.wordB.toLowerCase();
    if (isAnagram_1.default(anagram.wordA, anagram.wordB)) {
        if (!AnagramsList.has(anagram.wordA) && !AnagramsList.has(anagram.wordB)) {
            AnagramsList.set(anagram.wordA, 1);
        }
        else {
            AnagramsList.has(anagram.wordA) ?
                AnagramsList.set(anagram.wordA, AnagramsList.get(anagram.wordA) + 1)
                : AnagramsList.set(anagram.wordB, AnagramsList.get(anagram.wordB) + 1);
        }
    }
    else {
        return res.status(400).send({ Error: 'Not Anagram' });
    }
    /*update top ten anagram requested*/
    let key = anagram.wordA;
    if (!AnagramsList.has(key))
        key = anagram.wordB;
    const newAnagramRequest = { word: key, times: AnagramsList.get(key) };
    updateTopTen_1.default(newAnagramRequest, AnagramsTopTen);
    return res.status(200).send(anagram);
});
router.get('/', (req, res) => {
    console.log('get request');
    return res.status(200).json(AnagramsTopTen);
});
exports.default = router;
//# sourceMappingURL=anagrams.js.map