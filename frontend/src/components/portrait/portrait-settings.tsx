import { Component, h, State, Listen, Element } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.scss',
  shadow: true
})

export class PortraitSettings {

  @Element() host: HTMLElement;

  constructor(){}
  
  private default_user_input = {
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
  @State() grid_size_index: number = 0;
  @State() color_palette: string = 'Spectral';

  @Event() refresh_params: EventEmitter<Object>;
  @Event() on_color_list_toggle  : EventEmitter;

  private tab_ids: string[] = [
    'draw',
    'grid',
    'weave',
    'knight',
    'color'
  ]

  componentDidLoad() {
    this.refresh_params.emit(this.user_input_params)
  }

  handleRefreshParams(e) {
    e.preventDefault();
    this.refresh_params.emit(this.user_input_params)
  }

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
    this.user_input_params.weave = event.detail;
  }

  onTabSelect(selected_tab,tab_id) {
    this.tab_ids.filter((id) => id !== tab_id).forEach((tab_id) => { 
      let tab_element = this.host.shadowRoot.getElementById(tab_id + '-tab')
      tab_element.style['background-color'] = 'black';
      tab_element.style['color'] = 'white';
      let tab_content_element = this.host.shadowRoot.getElementById(tab_id);
      tab_content_element.style.display = "none"
    })
    this.host.shadowRoot.getElementById(tab_id).style.display = "flex";
    selected_tab.style['background-color'] = '#ddd';
    selected_tab.style['color'] = 'black';
  }

  render() {
    return (
      <div class="container">
        <div class="header">Image Settings</div>
        <div class="nav-bar">
          <div id="draw-tab" class="nav-tab" onClick={(event) => this.onTabSelect(event.target,'draw')}>Draw</div>
          <div id="grid-tab" class="nav-tab" onClick={(event) => this.onTabSelect(event.target,'grid')}>Grid</div>
          <div id="weave-tab" class="nav-tab" onClick={(event) => this.onTabSelect(event.target,'weave')}>Weave</div>
          <div id="knight-tab" class="nav-tab" onClick={(event) => this.onTabSelect(event.target,'knight')}>Knight</div>
          <div id="color-tab" class="nav-tab" onClick={(event) => this.onTabSelect(event.target,'color')}>Color</div>
        </div>
        <div class="content-container">
          <div id="draw" class="nav-tab-content"><draw-tab></draw-tab></div>
          <div id="grid" class="nav-tab-content"><grid-tab></grid-tab></div>
          <div id="weave" class="nav-tab-content"><weave-tab></weave-tab></div>
          <div id="knight" class="nav-tab-content">Knight</div>
          <div id="color" class="nav-tab-content">Color</div>
          <input class="refresh-button" type="submit" value="Submit" />
        </div>
      </div>
    );
  }
}

        // <form class='settings' onSubmit={(e)=>this.handleRefreshParams(e)}>
          
        //   <grid-size-input></grid-size-input>
        //   <color-palette-input></color-palette-input>
        //   <weave-input></weave-input>
        //   <input class="refresh-button" type="submit" value="Submit" />
        // </form>
        