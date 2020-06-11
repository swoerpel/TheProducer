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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorLibrary = void 0;
const chromotome_1 = require("../shared/chromotome");
const chroma = __importStar(require("chroma.ts"));
class ColorLibrary {
    constructor() {
        this.color_palettes = {};
        this.max_colors_per_palette = 5;
        this.getColorLibrary = () => {
            for (let i = 0; i < chromotome_1.chromotome_palettes.length; i++) {
                let key = chromotome_1.chromotome_palettes[i].name;
                this.color_palettes[key] = new Object(chromotome_1.chromotome_palettes[i].colors);
            }
            this.color_palettes = Object.assign(Object.assign({}, this.color_palettes), chroma.brewer);
            return Object.entries(this.color_palettes).map(([pal_name, pal_colors]) => {
                const cm = chroma.scale(pal_colors);
                let colors = [];
                for (let i = 0; i < this.max_colors_per_palette; i++) {
                    colors.push(cm(i / this.max_colors_per_palette).hex());
                }
                return {
                    name: pal_name,
                    colors: colors
                };
            });
        };
    }
}
exports.ColorLibrary = ColorLibrary;
//# sourceMappingURL=controller.js.map