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
let clients = [];
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
    if (updateTopTen_1.default(newAnagramRequest, AnagramsTopTen)) {
        sendTopTenToAll(AnagramsTopTen);
    }
    return res.status(200).send(anagram);
});
router.get('/', (req, res) => {
    console.log('get request');
    return res.status(200).json(AnagramsTopTen);
});
// Iterate clients list and use write res object method to send new nest
function sendTopTenToAll(data) {
    console.log('send top ten to all');
    console.log(clients.length);
    return clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
}
router.get('/live', (req, res) => {
    /*Mandatory headers and http status to keep connection open*/
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    /*After client opens connection send all nests as string*/
    const data = `{data: ${JSON.stringify(AnagramsTopTen)}}\n\n`;
    res.write("event: message\n");
    res.write(data);
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);
    console.log('client ID: ' + clientId);
    console.log(data);
    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(c => c.id !== clientId);
    });
});
exports.default = router;
//# sourceMappingURL=anagrams.js.map