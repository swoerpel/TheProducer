"use strict"
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const window = createSVGWindow()
const document = window.document
export class KnightTrapWeave {
    canvas:any; 
    constructor(){
        registerWindow(window, document);
        this.canvas = SVG(document.documentElement);
    }

    generate = () => {
        this.canvas.rect(100,100).fill('yellow').move(50,50);
        return this.canvas.node.outerHTML
    }

}

