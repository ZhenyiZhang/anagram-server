import express from 'express'
import AnagramRequest from "../classes/AnagramRequest";
import Anagram from "../classes/Anagram";
import updateTopTen from "../functions/updateTopTen";
import isAnagram from "../functions/isAnagram";
const router = express.Router();

const AnagramsList: Map<string, number> = new Map<string, number>();
const AnagramsTopTen: AnagramRequest[] = [];

router.post('/', (req, res) => {
    if(!req.body) return res.status(400).json({Error: 'No Words Were Found in Request'});

    const anagram: Anagram = req.body;
    if(!anagram) return res.status(400).json({Error: 'Invalid Data Format'});

    /*convert words into lowercase*/
    anagram.wordA = anagram.wordA.toLowerCase();
    anagram.wordB = anagram.wordB.toLowerCase();

    if(isAnagram(anagram.wordA, anagram.wordB)) {
        if(!AnagramsList.has(anagram.wordA) && !AnagramsList.has(anagram.wordB)) {
            AnagramsList.set(anagram.wordA, 1);
        } else {
            AnagramsList.has(anagram.wordA) ?
                AnagramsList.set(anagram.wordA, AnagramsList.get(anagram.wordA) + 1)
                : AnagramsList.set(anagram.wordB, AnagramsList.get(anagram.wordB) + 1)
        }
    } else {
        return res.status(400).send({Error: 'Not Anagram'});
    }

    /*update top ten anagram requested*/
    let key = anagram.wordA;
    if(!AnagramsList.has(key)) key = anagram.wordB;
    const newAnagramRequest: AnagramRequest = {word: key, times: AnagramsList.get(key)};
    updateTopTen(newAnagramRequest, AnagramsTopTen);

    return res.status(200).send(anagram);
});

router.get('/', (req, res) => {
    console.log('get request');
    return res.status(200).json(AnagramsTopTen);
});


export default router;