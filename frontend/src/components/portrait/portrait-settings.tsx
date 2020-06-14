import { Component, h, State, Listen } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.scss',
  shadow: true
})

export class PortraitSettings {

  constructor(){}
  
  @State() grid_size_index: number = 0;
  @State() color_palette: string = 'Spectral';

  @Event() refresh_params: EventEmitter<Object>;
  @Event() on_color_list_toggle  : EventEmitter;
  
  @Listen('on_grid_size_select')  
  setGridSize(event){
    this.grid_size_index = event.detail;
  }

  @Listen('on_palette_select')
  setColorPalette(event){
    this.color_palette = event.detail;
  }

  handleRefreshParams(e) {
    e.preventDefault();
    this.refresh_params.emit({
      grid_size_index: this.grid_size_index,
      color_palette: this.color_palette
    })
  }

  componentDidLoad() {
    this.refresh_params.emit({
      grid_size_index: this.grid_size_index,
      color_palette: this.color_palette
    })
  }

  render() {
    return (
      <div class="container">
        <div class="container header">Image Settings</div>
        <form class='settings' onSubmit={(e)=>this.handleRefreshParams(e)}>
          <grid-size-input></grid-size-input>
          <color-palette-input></color-palette-input>
          <weave-input></weave-input>
          <input class="refresh-button" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}