import { Component, h, State } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { Utf8ArrayToStr } from '../../../services/shared.service';

@Component({
	tag: 'form-color-palette',
  styleUrl: 'color-palette.scss',
  shadow: true,
})
export class ColorPaletteList {

  @State() color_palette: string = 'Spectral';
  @State() toggle_color_list : boolean = false;
  @Event() on_palette_select  : EventEmitter<string>;

  color_palette_list: {name:string, colors: string[]}[];

  async componentWillLoad() {
    this.color_palette_list = await this.getColorLibrary();
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
    this.color_palette = this.color_palette_list[event.target.value].name
    this.on_palette_select.emit(this.color_palette);
  }

  // getTempSVG(){
  //                     <svg width="10" height="10">
  //                   <rect width="10" height="10" color="red" />
  //                 </svg>
  // }

  render(){
    return (
        <div class='container'>
            <div class="container header">Color Palette</div>
            <input value={this.color_palette} 
                class='container input'
                type="text"/>
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