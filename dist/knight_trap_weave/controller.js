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
        this.cell_height = this.params.canvas.height / this.params.grid.rows;
        this.knight_border_width = this.cell_width * this.params.knight.border.width / 2;
        this.generate = () => {
            for (let i = 0; i < this.params.trap_count; i++) {
                const jumps = this.weave.Jump(this.params.jump.count);
                jumps.forEach((shapes, index) => {
                    this.drawKnight(shapes);
                    this.drawWeave(shapes, index);
                });
                // this.appendWeaveEndCaps(jumps) //unsure if needed
                this.weave.Refresh();
            }
            return this.canvas.node.outerHTML;
        };
        this.appendWeaveEndCaps = (jumps) => {
            const first_point = {
                x: jumps[0].weave[0].x + this.cell_width / 2 - this.weave_width / 2,
                y: jumps[0].weave[0].y + this.cell_height / 2 - this.weave_width / 2,
                color: jumps[0].weave[0].color,
            };
            const last_point = jumps[jumps.length - 1].weave[jumps[jumps.length - 1].weave.length - 1];
            last_point.x -= this.weave_width / 2,
                last_point.y -= this.weave_width / 2,
                this.canvas.circle(this.weave_width)
                    .move(first_point.x, first_point.y)
                    .fill(this.params.background.color);
            this.canvas.circle(this.weave_width)
                .move(last_point.x, last_point.y)
                .fill(this.params.background.color);
        };
        this.drawWeave = (shapes, index) => {
            if (this.params.weave.border.on) {
                this.canvas.polyline(shapes.weave.map((w) => [w.x, w.y]))
                    .fill('none')
                    .stroke({
                    width: this.weave_width * this.cell_width + this.weave_border_width,
                    color: this.params.weave.border.color
                });
            }
            // weave
            this.canvas.polyline(shapes.weave.map((w) => [w.x, w.y]))
                .fill('none')
                .attr('fill-opacity', 0.5)
                .stroke({
                width: this.weave_width * this.cell_width,
                color: shapes.weave[0].color,
                opacity: this.params.weave.alpha,
            });
            if (this.params.weave.width.dynamic && (index % this.params.weave.width.oss_freq == 0)) {
                this.weave_width += this.params.weave.width.step;
                if (this.weave_width > this.params.weave.width.max)
                    this.weave_width = this.params.weave.width.min;
            }
        };
        this.drawKnight = (shapes) => {
            shapes.knight.forEach((k) => {
                // need to draw border as wire frame
                // drawing entire rect messes with knight alpha
                this.canvas.rect(k.w, k.h)
                    .attr('fill', this.params.knight.border.color)
                    .attr('fill-opacity', this.params.knight.border.alpha)
                    .move(k.x, k.y);
                this.canvas.rect(k.w - this.knight_border_width, k.h - this.knight_border_width)
                    .attr('fill', k.color)
                    .attr('fill-opacity', this.params.knight.alpha)
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
        this.weave_width = this.cell_width * ((this.params.weave.width.init == 1.414) ? Math.sqrt(2) : this.params.weave.width.init);
        this.weave_border_width = this.cell_width * this.params.weave.border.width;
        const window = createSVGWindow();
        const document = window.document;
        registerWindow(window, document);
        console.log('document.documentElement', document.documentElement);
        this.canvas = SVG(document.documentElement);
        // console.log('this.canvas',this.canvas)
        this.canvas.rect(this.params.canvas.width, this.params.canvas.height)
            .attr('fill', this.params.color.background);
    }
}
exports.KnightTrapWeave = KnightTrapWeave;
//# sourceMappingURL=controller.js.map