import { Component, h, State } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { Utf8ArrayToStr } from '../../../services/shared.service';

@Component({
	tag: 'color-palette-list',
  styleUrl: 'color-palette-list.scss',
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

  setColorPalette(selected_palette){
    this.on_palette_select.emit( selected_palette);
  }

  render() {
    return (
      <div class="container">
        <h2 onClick={() => this. toggleColorListDropdown()}>
          color palettes  {this.toggle_color_list ? <span>&#9650;</span> : <span>&#9660;</span>}
        </h2> 
        <div class={ this.toggle_color_list ? 'grid-container-active' : 'grid-container-inactive' }>
          {this.color_palette_list.map(item => 
          <li onClick={() => this.setColorPalette(item.name)}>
            <div class="color-item">{item.name}</div>
          </li>
          )}
        </div>
      </div>
    )
  }
}