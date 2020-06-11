
import { chromotome_palettes } from '../shared/chromotome';
import * as chroma from 'chroma.ts';

export class ColorLibrary{
    color_palettes: any = {}; 
    max_colors_per_palette: number = 5;
    constructor() {}
    getColorLibrary = () => {
        for (let i = 0; i < chromotome_palettes.length; i++) {
          let key = chromotome_palettes[i].name;
          this.color_palettes[key] = new Object(chromotome_palettes[i].colors);
        }
        this.color_palettes = { ...this.color_palettes, ...chroma.brewer };
        return Object.entries(this.color_palettes).map(([pal_name,pal_colors]:[string, string[]])=>{
            const cm = chroma.scale(pal_colors)
            let colors = [];
            for(let i = 0; i < this.max_colors_per_palette; i++){
                colors.push(cm(i / this.max_colors_per_palette).hex())
            }
            return {
                name: pal_name,
                colors: colors
            }
        })
      }
}