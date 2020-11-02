"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateTopTen_1 = __importDefault(require("../functions/updateTopTen"));
const isAnagram_1 = __importDefault(require("../functions/isAnagram"));
const checkWord_1 = __importDefault(require("../functions/checkWord"));
const router = express_1.default.Router();
/*every anagram request in record*/
const AnagramsList = new Map();
/*top ten anagrams*/
const AnagramsTopTen = [];
/*clients list*/
let clients = [];
/*send top ten anagrams to all connected clients*/
function sendTopTenToAll(data) {
    return clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
}
/*new successful anagram request*/
router.post('/', (req, res) => {
    /*no words are found in request body*/
    if (!req.body)
        return res.status(400).json({ Error: 'No Words Were Found in Request' });
    const anagram = req.body;
    /*body does not match anagram format*/
    if (!anagram)
        return res.status(400).json({ Error: 'Invalid Data Format' });
    if (!checkWord_1.default(anagram.wordA) || !checkWord_1.default(anagram.wordB)) {
        return res.status(400).json({ Error: 'Invalid Word' });
    }
    /*convert words into lowercase*/
    anagram.wordA = anagram.wordA.toLowerCase();
    anagram.wordB = anagram.wordB.toLowerCase();
    /*if words are anagram*/
    if (isAnagram_1.default(anagram.wordA, anagram.wordB)) {
        if (!AnagramsList.has(anagram.wordA) && !AnagramsList.has(anagram.wordB)) {
            /*new words*/
            AnagramsList.set(anagram.wordA, 1);
        }
        else {
            /*words have been requested*/
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
    /*find the right key*/
    if (!AnagramsList.has(key))
        key = anagram.wordB;
    const newAnagramRequest = { word: key, times: AnagramsList.get(key) };
    /*if top ten list has updated, send to all clients*/
    if (updateTopTen_1.default(newAnagramRequest, AnagramsTopTen)) {
        sendTopTenToAll(AnagramsTopTen);
    }
    return res.status(200).send(anagram);
});
/*get top ten anagrams*/
router.get('/', (req, res) => {
    return res.status(200).json(AnagramsTopTen);
});
/*clients request to get top ten anagrams in live*/
router.get('/live', (req, res) => {
    /*Mandatory headers and http status to keep connection open*/
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    /*After client opens connection send all data as string*/
    const data = `{data: ${JSON.stringify(AnagramsTopTen)}}\n\n`;
    res.write("event: message\n");
    res.write(data);
    /*set up and store client id using timestamp and client response*/
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);
    /*delete clients from list when connection is closed*/
    req.on('close', () => {
        clients = clients.filter(c => c.id !== clientId);
    });
});
exports.default = router;
//# sourceMappingURL=anagrams.js.map