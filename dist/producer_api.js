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
const controller_1 = require("./knight_trap_weave/controller");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const { convert } = require('convert-svg-to-png');
const app = express_1.default();
const port = 8080;
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.get("/knight_trap_weave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('KTW request', req.body);
    const ktw = new controller_1.KnightTrapWeave(req.body);
    const svg = ktw.generate();
    const png = yield convert(svg, {
        width: req.body.canvas.width,
        height: req.body.canvas.width
    });
    res.set('Content-Type', 'image/png');
    // console.log('svg->',svg)
    // res.send(svg);
    res.send(png);
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=producer_api.js.map