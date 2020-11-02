"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/*import routes*/
const anagrams_1 = __importDefault(require("./routes/anagrams"));
const apiBase = '/api';
/* set up routes */
app.use(apiBase + '/anagrams', anagrams_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map