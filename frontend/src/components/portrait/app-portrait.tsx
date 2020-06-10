import { Component, h, Listen, State, Watch } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'app-portrait',
  styleUrl: 'app-portrait.css',
  shadow: true
})


export class AppPortrait {
  innerHTML: string;
  @State() image_params = []; 
  constructor() {}

  @Listen('refresh_params')
  componentWillLoad(e){
    let options = [{},{},{}]
    console.log('e',e)
    this.image_params = options.map((op)=>{
      return JSON.stringify(knightTrapWeaveService.paramFactory(12))
    })
    console.log('post img params',this.image_params)
  }

  componentWillRender(){
  }

  render() {
    console.log('render->',this.image_params)
    return (
      <div class='app-portrait'>
        <div class='portrait-image-group'>
          {[...this.image_params].map((params)=>{
              return <portrait-image simulation_params={params}></portrait-image>
          })} 
        </div>
        <portrait-settings></portrait-settings>
      </div>
    );
  }
}

