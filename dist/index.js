"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
/*set the backend server URL*/
const port = process.env.PORT || PORT;
/*listen on port*/
app_1.default.listen(port, () => console.log('server started on port ' + PORT));
//# sourceMappingURL=index.js.map