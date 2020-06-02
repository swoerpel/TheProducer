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
        this.cell_width = this.params.canvas.width / this.params.grid.cols;
        this.knight_border_width = this.cell_width * this.params.draw.knight.border.width / 2;
        this.generate = () => {
            for (let i = 0; i < this.params.draw.trap_count; i++) {
                this.weave.Jump(this.params.jump.count)
                    .forEach((shapes) => {
                    this.drawKnight(shapes);
                    this.drawWeave(shapes);
                });
                this.weave.Refresh();
            }
            return this.canvas.node.outerHTML;
        };
        this.drawWeave = (shapes) => {
            const weave_width = this.cell_width * ((this.params.draw.weave.width == 1.414) ? Math.sqrt(2) : this.params.draw.weave.width);
            const weave_border_width = this.cell_width * this.params.draw.weave.border.width;
            if (this.params.draw.weave.border.on) {
                this.canvas.polyline(shapes.weave.map((w) => [w.x, w.y]))
                    .fill('none')
                    .stroke({
                    width: weave_width + weave_border_width,
                    color: this.params.draw.weave.border.color
                });
            }
            // weave
            this.canvas.polyline(shapes.weave.map((w) => [w.x, w.y]))
                .fill('none')
                .stroke({
                width: weave_width,
                color: shapes.weave[0].color
            });
        };
        this.drawKnight = (shapes) => {
            shapes.knight.forEach((k) => {
                // need to draw border as wire frame
                // drawing entire rect messes with knight alpha
                this.canvas.rect(k.w, k.h)
                    .attr('fill', this.params.draw.knight.border.color)
                    .attr('fill-opacity', this.params.draw.knight.border.alpha)
                    .move(k.x, k.y);
                this.canvas.rect(k.w - this.knight_border_width, k.h - this.knight_border_width)
                    .attr('fill', k.color)
                    .attr('fill-opacity', this.params.draw.knight.alpha)
                    .move(k.x + this.knight_border_width, k.y + this.knight_border_width);
            });
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
        this.drawBackground();
    }
    drawBackground() {
        if (this.params.draw.background.on) {
            this.canvas.rect(this.params.canvas.width, this.params.canvas.height)
                .attr('fill', this.params.draw.background.color);
        }
    }
}
exports.KnightTrapWeave = KnightTrapWeave;
//# sourceMappingURL=controller.js.map