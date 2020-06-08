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
app.post("/knight_trap_weave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('KTW request', req.body);
    const ktw = new controller_1.KnightTrapWeave(req.body);
    const svg = ktw.generate();
    const png = yield convert(svg, {
        width: req.body.canvas.width,
        height: req.body.canvas.width
    });
    // const b64Img = Buffer.from(png,'base64')
    // res.header('Content-Type', 'image/svg+xml');
    // res.send(svg);
    // res.send(`
    //   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="400" height="180">
    //   <rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke: black;stroke-width:5;opacity:0.5" /> 
    //   </svg>
    // `);
    // console.log('svg->',svg)
    // console.log(b64Img)
    // res.send(b64Img);
    // res.send(png);
    // const im = png.split(",")[1];
    // const img = Buffer.from(svg,'utf-8');
    console.log('svg.length', svg.length);
    res.writeHead(200, {
        'Content-Type': 'image/svg+xml',
        'Content-Length': svg.length
    });
    res.end(svg);
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=producer_api.js.map