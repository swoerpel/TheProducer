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
    cell_height = this.params.canvas.height / this.params.grid.rows;
    knight_border_width = this.cell_width * this.params.draw.knight.border.width / 2;
    weave_width: number;
    weave_border_width: number;
    constructor(private params: any){
        this.weave = new Weave(
            this.params, 
            this.createColorMachine()
        );
        this.weave_width = this.cell_width * ((this.params.draw.weave.width.init == 1.414) ? Math.sqrt(2) : this.params.draw.weave.width.init);
        this.weave_border_width = this.cell_width * this.params.draw.weave.border.width;
        const window = createSVGWindow()
        const document = window.document
        registerWindow(window, document);
        this.canvas = SVG(document.documentElement);
        this.drawBackground();
    }

    generate = () => {
        for(let i = 0; i < this.params.draw.trap_count; i++){
            const jumps = this.weave.Jump(this.params.jump.count)
            jumps.forEach((shapes: any, index: number) =>{
                this.drawKnight(shapes);
                this.drawWeave(shapes,index);
            });  
            this.appendWeaveEndCaps(jumps)
            this.weave.Refresh();
        }
        return this.canvas.node.outerHTML
    }

    appendWeaveEndCaps = (jumps: any) => {
        const first_point = {
            x: jumps[0].weave[0].x + this.cell_width / 2 - this.weave_width / 2,
            y: jumps[0].weave[0].y + this.cell_height / 2 - this.weave_width / 2,
            color: jumps[0].weave[0].color,
        }
        const last_point = jumps[jumps.length - 1].weave[jumps[jumps.length - 1].weave.length - 1]
        last_point.x -= this.weave_width / 2,
        last_point.y -= this.weave_width / 2,
        this.canvas.circle(this.weave_width)
            .move(first_point.x,first_point.y)
            .fill(this.params.draw.background.color)

        this.canvas.circle(this.weave_width)
            .move(last_point.x,last_point.y)
            .fill(this.params.draw.background.color)
    }


    drawWeave = (shapes: any, index: number) => {

        if(this.params.draw.weave.border.on){
            this.canvas.polyline(shapes.weave.map((w:any)=>[w.x,w.y]))
            .fill('none')
            .stroke({ 
                width: this.weave_width * this.cell_width + this.weave_border_width, 
                color: this.params.draw.weave.border.color
            });
        }

        // weave
        this.canvas.polyline(shapes.weave.map((w:any)=>[w.x,w.y]))
        .fill('none')
        .stroke({ 
            width: this.weave_width * this.cell_width, 
            color: shapes.weave[0].color 
        });
        if(this.params.draw.weave.width.dynamic){
            this.weave_width += this.params.draw.weave.width.step
            if(this.weave_width > this.params.draw.weave.width.max)
                this.weave_width = this.params.draw.weave.width.min;
        }
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

    drawBackground(){
        if(this.params.draw.background.on){
            this.canvas.rect(this.params.canvas.width, this.params.canvas.height)
            .attr('fill', this.params.draw.background.color)
        }
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

