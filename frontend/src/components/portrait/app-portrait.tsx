import { Component, h, Listen, State } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'app-portrait',
  styleUrl: 'app-portrait.scss',
  shadow: true
})


export class AppPortrait {
  @State() image_params; 
  constructor() {
  }

  @Listen('refresh_params')
  refreshImageParams(event: CustomEvent<any> = null){
    console.log('event',event.detail)
    this.image_params = knightTrapWeaveService.convertParams();
  }

  render() {
    return (
      <div class='app-portrait'>
        <div class='portrait-image-group'>
          <portrait-image simulation_params={this.image_params}></portrait-image>
        </div>
        <div class='portrait-settings'>
          <portrait-settings></portrait-settings>
        </div>
      </div>
    );
  }
}