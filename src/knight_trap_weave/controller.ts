"use strict"
import * as chroma from 'chroma.ts';

import { Weave } from "./weave";
import { Rect } from "./models";
import { chromotome_palettes } from './chromotome';

const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');

export class KnightTrapWeave {
    canvas:any;
    weave: Weave;
    color_palettes: any = {}; 
    cell_width = this.params.canvas.width / this.params.grid.cols;
    knight_border_width = this.cell_width * this.params.draw.knight.border.width / 2;

    constructor(private params: any){
        this.weave = new Weave(
            this.params, 
            this.createColorMachine()
        );
        
        const window = createSVGWindow()
        const document = window.document
        registerWindow(window, document);
        this.canvas = SVG(document.documentElement);
        this.drawBackground();
    }

    generate = () => {
        for(let i = 0; i < this.params.draw.trap_count; i++){
            this.weave.Jump(this.params.jump.count)
                .forEach((shapes: any) =>{
                this.drawKnight(shapes);
                this.drawWeave(shapes);
            });
            this.weave.Refresh();
        }
        return this.canvas.node.outerHTML
    }

    drawBackground(){
        if(this.params.draw.background.on){
            this.canvas.rect(this.params.canvas.width, this.params.canvas.height)
            .attr('fill', this.params.draw.background.color)
        }
    }

    drawWeave = (shapes: any) => {
        const weave_width = this.cell_width * ((this.params.draw.weave.width == 1.414) ? Math.sqrt(2) : this.params.draw.weave.width);
        const weave_border_width = this.cell_width * this.params.draw.weave.border.width;
        if(this.params.draw.weave.border.on){
            this.canvas.polyline(shapes.weave.map((w:any)=>[w.x,w.y]))
            .fill('none')
            .stroke({ 
                width: weave_width + weave_border_width, 
                color: this.params.draw.weave.border.color
            });
        }

        // weave
        this.canvas.polyline(shapes.weave.map((w:any)=>[w.x,w.y]))
        .fill('none')
        .stroke({ 
            width: weave_width, 
            color: shapes.weave[0].color 
        });
    }

    drawKnight = (shapes: any) => {
        shapes.knight.forEach((k: Rect) =>{
            // need to draw border as wire frame
            // drawing entire rect messes with knight alpha
            this.canvas.rect(k.w, k.h)
            .attr('fill', this.params.draw.knight.border.color)
            .attr('fill-opacity', this.params.draw.knight.border.alpha)
            .move(k.x,k.y);

            this.canvas.rect(k.w - this.knight_border_width, k.h - this.knight_border_width)
            .attr('fill', k.color)
            .attr('fill-opacity', this.params.draw.knight.alpha)
            .move(k.x + this.knight_border_width,k.y + this.knight_border_width);
        });
    }

    createColorMachine = () => {
        for (let i = 0; i < chromotome_palettes.length; i++) {
          let key = chromotome_palettes[i].name;
          this.color_palettes[key] = new Object(chromotome_palettes[i].colors);
        }
        this.color_palettes = { ...this.color_palettes, ...chroma.brewer };
        if(Array.isArray(this.params.color.palette)){
          return chroma.scale(this.params.color.palette);
        }else{
          if(this.params.color.palette in this.color_palettes)
            return chroma.scale(this.color_palettes[this.params.color.palette]);
          else
            return chroma.scale(['black','white']);
        }
      }
    
    //   randomizeColorMachine = () =>{
    //     let pals = tome.getAll()
    //     let rand_palette_key = Math.floor(Math.random() * pals.length)
    //     let new_pal = pals[rand_palette_key]
    //     color_machine = chroma.scale(new_pal.colors)
    //     weave.color_machine = color_machine;
    //     console.log('new_pal ->', new_pal)
    //   }
    

}

