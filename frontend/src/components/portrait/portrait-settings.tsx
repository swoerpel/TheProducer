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
  
  private default_user_input = {}

  @State() user_input_params = this.default_user_input
  @State() grid_size_index: number = 0;
  @State() color_palette: string = 'Spectral';

  @Event() on_update_user_input_params: EventEmitter<Object>;
  @Event() on_color_list_toggle  : EventEmitter;

  private tab_ids: string[] = [
    'draw',
    'grid',
    'weave',
    'knight',
    'color'
  ]

  componentDidLoad() {
    // this.on_update_user_input_params.emit(this.user_input_params)
  }

  @Listen('on_grid_input_change')
  handleGridInputChange(grid_params){
    console.log('params',grid_params.detail)
    this.user_input_params = {
      ...this.user_input_params,
      grid: {...grid_params.detail}
    }
  }


  onTabSelect(selected_tab,tab_id) {
    this.tab_ids.filter((id) => id !== tab_id).forEach((tab_id) => { 
      let unselected_tab = this.host.shadowRoot.getElementById(tab_id + '-tab');
      unselected_tab.classList.remove('selected')
      unselected_tab.classList.add('unselected')
      unselected_tab.classList.add('unselected:hover')
      let unselected_tab_content = this.host.shadowRoot.getElementById(tab_id)
      unselected_tab_content.style.display = "none"
    })
    let tab_content_element = this.host.shadowRoot.getElementById(tab_id);
    tab_content_element.style.display = "flex";
    selected_tab.classList.remove('unselected')
    selected_tab.classList.remove('unselected:hover')
    selected_tab.classList.add('selected')
  }

  updateUserInputParams(e){
    e.preventDefault();
    this.on_update_user_input_params.emit(this.user_input_params)
  }

  render() {
    return (
      <div class="container">
        <div class="header">Image Settings</div>
        <div class="nav-bar">{this.tab_ids.map((id)=>
          <div onClick={(event) => this.onTabSelect(event.target,id)} 
               id={`${id}-tab`} 
               class="nav-tab selected" >{id.charAt(0).toUpperCase() + id.slice(1)}
          </div>)}
        </div>
        {/* to implement this with a loop a generic tab component is needed */}
        <div class="content-container">
          <div id="draw" class="nav-tab-content"><draw-tab></draw-tab></div>
          <div id="grid" class="nav-tab-content"><grid-tab></grid-tab></div>
          <div id="weave" class="nav-tab-content"><weave-tab></weave-tab></div>
          <div id="knight" class="nav-tab-content">Knight</div>
          <div id="color" class="nav-tab-content">Color</div>
          <input onClick={(event)=>this.updateUserInputParams(event)} class="refresh-button" type="submit" value="Submit" />
        </div>
      </div>
    );
  }
}