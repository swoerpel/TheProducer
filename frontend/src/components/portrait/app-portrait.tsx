import { Component, h, Listen, State, Watch } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'app-portrait',
  styleUrl: 'app-portrait.css',
  shadow: true
})


export class AppPortrait {
  @State() image_params; 
  constructor() {
    this.refreshImageParams();
  }

  @Listen('refresh_params')
  refreshImageParams(event: CustomEvent<Object> = null){
    console.log('event',event)
    if(!event)
      this.image_params = knightTrapWeaveService.paramFactory(6);
    else
      this.image_params = knightTrapWeaveService.paramFactory(event.detail);
  }

  render() {

    return (
      <div class='app-portrait'>
        <div class='portrait-image-group'>
          <portrait-image simulation_params={this.image_params}></portrait-image>
        </div>
        <portrait-settings></portrait-settings>
      </div>
    );
  }
}