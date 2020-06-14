import { Component, h, State } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { Utf8ArrayToStr } from '../../../services/shared.service';

@Component({
	tag: 'color-palette-input',
  styleUrl: 'color-palette-input.scss',
  shadow: true,
})
export class ColorPaletteList {
  @State() color_palette_index: number = 118; //spectral
  @State() toggle_color_list : boolean = false;
  @State() hide_input: boolean = true;
  @State() color_palette_name: string;
  @Event() on_palette_select  : EventEmitter<string>;

  color_palette_list: {name:string, colors: string[]}[];
  
  async componentWillLoad() {
    this.color_palette_list = await this.getColorLibrary();
    this.color_palette_name = this.color_palette_list[this.color_palette_index].name
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
  setColorPalette(palette_index){
    this.color_palette_name = this.color_palette_list[palette_index].name
    this.on_palette_select.emit(this.color_palette_name);
  }

  setColorPaletteSVG(palette_index){
    const square_len = 30
    const color_count = this.color_palette_list[palette_index].colors.length
    let color_palette_svg = `<svg width="${square_len * color_count}" height="${square_len}">`
    this.color_palette_list[palette_index].colors.forEach((color,index) => {
      color_palette_svg += `<rect x="${index * square_len}" width="${square_len}" height="${square_len}" style="fill:${color}" />`
    })
    color_palette_svg += `</svg>`
    return color_palette_svg
  }


  toggleHideInputs(){
    this.hide_input = !this.hide_input;
  }


  render(){
    return (
      <div class='container'>
      <div class="header-container">
          <div class="header">Color Palette</div>
          <input type="text" 
                 onInput={(event)=> this.setColorPalette(event)}
                 value={this.color_palette_name}>
                   {this.color_palette_name}</input>
          <button onClick={() =>this.toggleHideInputs()} class='show-hide-button'>
              {this.hide_input ? 'show' : 'hide'}
          </button>
      </div>
      <div class={this.hide_input ? 'input-container-hide':"input-container-show"}>
      {
          this.color_palette_list.map((palette,index) => {
              return <div class="color-palette-container">
                <div>{palette.name}</div>
                <div class="palette-preview" innerHTML={this.setColorPaletteSVG(index)}></div>
                <button onClick={() => this.setColorPalette(index)}>Select</button>
              </div>
          })}
        
      </div>
      </div>
      );
  }


}
