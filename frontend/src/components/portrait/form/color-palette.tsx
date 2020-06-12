import { Component, h, State, Element } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { Utf8ArrayToStr } from '../../../services/shared.service';

@Component({
	tag: 'form-color-palette',
  styleUrl: 'color-palette.scss',
  shadow: true,
})
export class ColorPaletteList {
  @Element() host: HTMLElement;
  @State() color_palette_index: number = 118;
  @State() toggle_color_list : boolean = false;
  @Event() on_palette_select  : EventEmitter<string>;

  color_palette_list: {name:string, colors: string[]}[];
  color_palette_svg: string;
  async componentWillLoad() {
    
    this.color_palette_list = await this.getColorLibrary();
    this.setColorPaletteSVG();
  }

  getColorLibrary = () => {
    let result = '';
    let method = 'GET';
    let url = 'http://localhost:8080/color_library';
    return fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      const reader = response.body.getReader();
      return reader.read().then(function processText({ done, value }) {
          if (done) 
              return JSON.parse(result);
          result = result.concat(Utf8ArrayToStr(value));
          return reader.read().then(processText);
      });
    });
  }

  toggleColorListDropdown(): void {
     this.toggle_color_list = !this.toggle_color_list;
  }

  setColorPalette(event){
    console.log('pal event',event.target.value)
    this.color_palette_index = event.target.value
    this.on_palette_select.emit(this.color_palette_list[event.target.value].name);
    this.setColorPaletteSVG();
  }

  setColorPaletteSVG(){
    const rect_width = 25
    const color_count = this.color_palette_list[this.color_palette_index].colors.length
    this.color_palette_svg = `<svg width="${rect_width * color_count}" height="25">`
    this.color_palette_list[this.color_palette_index].colors.forEach((color,index) => {
      this.color_palette_svg += `<rect x="${index * rect_width}" width="25" height="25" style="fill:${color}" />`
    })
    this.color_palette_svg += `</svg>`
  }


  render(){
    return (
        <div class='container'>
            <div class="container header">Color Palette</div>
            <input value={this.color_palette_list[this.color_palette_index].name} 
                class='container input'
                type="text"/>
            <div innerHTML={this.color_palette_svg}></div>
            <select onInput={(event)=> this.setColorPalette(event)}>{
            this.color_palette_list.map((palette,index) =>
                <option class="container option" value={index}>
                  {palette.name}
                </option>
            )
            }
            </select>
        </div>
      );
  }


}