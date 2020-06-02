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
const express_1 = __importDefault(require("express"));
const { convert } = require('convert-svg-to-png');
const knight_trap_weave_1 = require("./knight_trap_weave");
const app = express_1.default();
const port = 8080; // default port to listen
// define a route handler for the default home page
app.get("/knight_trap_weave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ktw = new knight_trap_weave_1.KnightTrapWeave();
    const svg = ktw.generate();
    const png = yield convert(svg, { width: 640, height: 640 });
    res.set('Content-Type', 'image/png');
    res.send(png);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=producer_api.js.map