"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnightTrapWeave = void 0;
const chroma = __importStar(require("chroma.ts"));
const weave_1 = require("./weave");
const chromotome_1 = require("./chromotome");
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
class KnightTrapWeave {
    constructor(params) {
        this.params = params;
        this.color_palettes = {};
        this.generate = () => {
            const jump_data = this.weave.Jump(this.params.draw.count);
            this.weave.RefreshGrid();
            this.weave.RefreshKnight();
            jump_data.forEach((rect) => {
                this.canvas.rect(rect.w, rect.h).fill(rect.color).move(rect.x, rect.y);
            });
            return this.canvas.node.outerHTML;
        };
        this.createColorMachine = () => {
            for (let i = 0; i < chromotome_1.chromotome_palettes.length; i++) {
                let key = chromotome_1.chromotome_palettes[i].name;
                this.color_palettes[key] = new Object(chromotome_1.chromotome_palettes[i].colors);
            }
            this.color_palettes = Object.assign(Object.assign({}, this.color_palettes), chroma.brewer);
            if (Array.isArray(this.params.color.palette)) {
                return chroma.scale(this.params.color.palette);
            }
            else {
                if (this.params.color.palette in this.color_palettes)
                    return chroma.scale(this.color_palettes[this.params.color.palette]);
                else
                    return chroma.scale(['black', 'white']);
            }
        };
        this.weave = new weave_1.Weave(this.params, this.createColorMachine());
        const window = createSVGWindow();
        const document = window.document;
        registerWindow(window, document);
        this.canvas = SVG(document.documentElement);
    }
}
exports.KnightTrapWeave = KnightTrapWeave;
//# sourceMappingURL=controller.js.map