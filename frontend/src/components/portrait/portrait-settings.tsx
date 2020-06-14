import { Component, h, State, Listen } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.scss',
  shadow: true
})

export class PortraitSettings {

  constructor(){}
  
  @State() simulation_params = knightTrapWeaveService.defaultParams;

  emitRefreshParamsEvent_(){
    //causes svg refresh
    console.log('new refresh params event')
    // this.refresh_params.emit(this.simulation_params)
  }

  componentDidLoad() {
    this.refresh_params.emit(this.simulation_params)
  }
  // componentDidLoad() {
  //   this.refresh_params.emit({
  //     grid_size_index: this.grid_size_index,
  //     color_palette: this.color_palette
  //   })
  // }


  // @Listen('on_grid_input_change')
  // function setGridInput(){

  // }
  // @Listen('on_color_input_change')
  // function setColorInput(){
    
  // }
  // @Listen('on_weave_input_change')
  // function setWeaveInput(){
    
  // }
  // @Listen('on_knight_input_change')
  // function setKnightInput(){
    
  // }
  // @Listen('on_trap_count_input_change')
  // function setTrapCountInput(){
    
  // }



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