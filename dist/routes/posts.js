"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const memory_cache_1 = __importDefault(require("memory-cache"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = req.query.tags;
    const sortBy = req.query.sortBy;
    const direction = req.query.direction;
    if (!tags)
        return res.status(400).json({ error: 'Tags parameter is required' });
    if (!sortBy)
        return res.status(400).json({ error: 'SortBy parameter is required' });
    if (!direction)
        return res.status(400).json({ error: 'Direction parameter is required' });
    const tagsArr = tags.split(',');
    let postsArr = [];
    for (const tag of tagsArr) {
        const cacheData = memory_cache_1.default.get(tag);
        if (cacheData) {
            postsArr = [...postsArr, ...cacheData];
            continue;
        }
        const requestBody = `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`;
        const encodedURI = encodeURI(requestBody);
        const response = yield axios_1.default.get(encodedURI)
            .catch(err => { res.status(400).send(err); });
        if (!response)
            return res.status(400).send(response);
        const posts = response.data;
        memory_cache_1.default.put(tag, posts.posts);
        postsArr = [...postsArr, ...posts.posts];
    }
    res.status(200).send(postsArr);
})));
exports.default = router;
//# sourceMappingURL=posts.js.map