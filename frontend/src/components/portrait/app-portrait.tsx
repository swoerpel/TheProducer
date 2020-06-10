import { Component, h } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'app-portrait',
  styleUrl: 'app-portrait.css',
  shadow: true
})

export class AppHome {
  innerHTML: string;
  image_params = [];  
  constructor() {}

  componentWillLoad(){
    let options = [{},{},{}]
    options.forEach((op)=>{
      this.image_params.push(JSON.stringify(knightTrapWeaveService.paramFactory(6)))
    })
  }

  render() {
    return (
      <div class='app-portrait'>
        <div class='portrait-image-group'>
          {this.image_params.map((params)=>{
              return <portrait-image simulation_params={params}></portrait-image>
          })} 
        </div>
        <portrait-settings></portrait-settings>
      </div>
    );
  }
}

