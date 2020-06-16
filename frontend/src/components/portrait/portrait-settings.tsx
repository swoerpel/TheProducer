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
  
  default_user_input = {
    grid_size_index:0,
    color_palette: 'Spectral',
    weave:{
      width:{
        low: 25,
        high: 100,
        divisions: 3,
      }
    }
  }


  @State() user_input_params = this.default_user_input

  emitRefreshParamsEvent_(){
    //causes svg refresh
    console.log('new refresh params event')
    this.refresh_params.emit(this.user_input_params)
  }

  componentDidLoad() {
    this.refresh_params.emit(this.user_input_params)
  }

  handleRefreshParams(e) {
    e.preventDefault();
    this.refresh_params.emit(this.user_input_params)

    // this.refresh_params.emit({
    //   grid_size_index: this.grid_size_index,
    //   color_palette: this.color_palette
    // })
  }

  // componentDidLoad() {
  //   this.refresh_params.emit({
  //     grid_size_index: this.grid_size_index,
  //     color_palette: this.color_palette
  //   })
  // }


  // @Listen('on_grid_input_change')
  // setGridInput(){

  // }
  // @Listen('on_color_input_change')
  // setColorInput(){
    
  // }

  // @Listen('on_knight_input_change')
  // setKnightInput(){
    
  // }
  // @Listen('on_trap_count_input_change')
  // setTrapCountInput(){
    
  // }



  @State() grid_size_index: number = 0;
  @State() color_palette: string = 'Spectral';

  @Event() refresh_params: EventEmitter<Object>;
  @Event() on_color_list_toggle  : EventEmitter;
  
  @Listen('on_grid_size_select')  
  setGridSize(event){
    this.user_input_params.grid_size_index = event.detail;
  }

  @Listen('on_palette_select')
  setColorPalette(event){
    this.user_input_params.color_palette = event.detail;
  }

  @Listen('on_weave_input_change')
  setWeaveInput(event){
    console.log('in portrait settings',event.detail.width)
    this.user_input_params.weave = event.detail;
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