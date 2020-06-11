import { Component, h, State, Watch, Listen } from '@stencil/core';
import { Event, Element, EventEmitter } from '@stencil/core';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.css',
  shadow: true
})

export class PortraitSettings {

  @Element() host: HTMLElement;
  
  @State() grid_size: number = 8;
  @State() color_palette: string = 'Spectral';

  @Event({
    eventName: 'refresh_params',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) refresh_params: EventEmitter<Object>;


  @Event() on_color_list_toggle  : EventEmitter;

  setGridSize(event){
    this.grid_size = event.target.value;
  }

  @Listen('on_palette_select')
  setColorPalette(event){
    console.log('listenboievent',event)
    this.color_palette = event.detail;
  }

  handleRefreshParams(e) {
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
          <color-palette-list></color-palette-list>
          <input class="refresh-button" type="submit" value="Submit" />
        </form>
    );
  }
}

