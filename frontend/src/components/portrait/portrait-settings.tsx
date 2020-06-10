import { Component, h, State } from '@stencil/core';
import { Event, Element, EventEmitter } from '@stencil/core';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.css',
  shadow: true
})

export class PortraitSettings {

  @Element() host: HTMLElement;
  
  @State() grid_size: number;
  @State() color_palette: string;

  @Event({
    eventName: 'refresh_params',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) refresh_params: EventEmitter<Object>;


  setGridSize(event){
    this.grid_size = event.target.value;
  }

  setColorPalette(event){
    this.color_palette = event.target.value;
  }


  handleRefreshParams(e) {
    console.log('EEEEEEE',e)
    e.preventDefault();
    this.refresh_params.emit({
      grid_size: this.grid_size,
      color_palette: this.color_palette
    })
  }

  render() {
    return (
        <form class='portrait-settings' onSubmit={(e)=>this.handleRefreshParams(e)}>
          <label>Grid Size</label>
          <input onInput={(event)=> this.setGridSize(event)} type="text"/>
          <label>Color Palette</label>
          <input onInput={(event)=> this.setColorPalette(event)} type="text"/>
          
          <input class="refresh-button" type="submit" value="Submit" />
        </form>
    );
  }
}

