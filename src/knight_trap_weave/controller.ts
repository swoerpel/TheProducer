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
    constructor(private params: any){
        this.weave = new Weave(
            this.params, 
            this.createColorMachine()
        );
        const window = createSVGWindow()
        const document = window.document
        registerWindow(window, document);
        this.canvas = SVG(document.documentElement);
    }

    generate = () => {
        const jump_data = this.weave.Jump(this.params.draw.count)
        this.weave.RefreshGrid();
        this.weave.RefreshKnight();
        jump_data.forEach((shapes: any) =>{
            shapes.knight.forEach((k: Rect) =>{
                this.canvas.rect(k.w, k.h)
                .fill(k.color)
                .move(k.x,k.y);
            })
            this.canvas.polyline(shapes.weave.map((w:any)=>[w.x,w.y]))
                .fill('none')
                .stroke({ 
                    width: 45, 
                    color: 'black' 
                })
            this.canvas.polyline(shapes.weave.map((w:any)=>[w.x,w.y]))
                .fill('none')
                .stroke({ 
                    width: 40, 
                    color: shapes.weave[0].color 
                })
        })
        return this.canvas.node.outerHTML
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

