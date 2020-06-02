"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnightTrapWeave = void 0;
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const window = createSVGWindow();
const document = window.document;
class KnightTrapWeave {
    constructor() {
        this.generate = () => {
            this.canvas.rect(100, 100).fill('yellow').move(50, 50);
            return this.canvas.node.outerHTML;
        };
        registerWindow(window, document);
        this.canvas = SVG(document.documentElement);
    }
}
exports.KnightTrapWeave = KnightTrapWeave;
//# sourceMappingURL=knight_trap_weave.js.map