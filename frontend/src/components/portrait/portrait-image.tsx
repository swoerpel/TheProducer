import { Component, h, State, Prop, Watch } from '@stencil/core';
import { Utf8ArrayToStr } from '../../services/shared.service';

@Component({
  tag: 'portrait-image',
  styleUrl: 'portrait-image.css',
  shadow: true
})

export class PortraitSVGComponent {
  @Prop() simulation_params: any;

  @State() svg:string;

  constructor(){}

  componentWillLoad() {
    this.refreshSVG();
  }

  @Watch('simulation_params')
  async refreshSVG(){
    console.log('refresh')
    let method = 'POST';
    let url = 'http://localhost:8080/knight_trap_weave';
    this.svg = await this.sendHttpRequest(method,url,this.simulation_params);
  }

  sendHttpRequest = async (method, url, data) => {
    let result = '';
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
        const reader = response.body.getReader();
        return reader.read().then(function processText({ done, value }) {
            if (done) 
                return result;
            result = result.concat(Utf8ArrayToStr(value));
            return reader.read().then(processText);
        });
    });
  }

  render() {
    return (
      <div innerHTML={this.svg}></div>
    );
  }
}

