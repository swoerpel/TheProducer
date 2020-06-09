import { Component, h, State } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/simulation_params.service';
import { Utf8ArrayToStr } from '../../services/shared.service';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})

export class AppHome {
  @State() svg:string;
  async componentWillLoad() {
    this.svg = await this.refreshSVG();
  }

  refreshSVG(){
    let method = 'POST';
    let url = 'http://localhost:8080/knight_trap_weave';
    let simulation_params = knightTrapWeaveService.paramFactory(16);  
    return this.sendHttpRequest(method,url,simulation_params);
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

  componentShouldUpdate(prop){
    this.svg = prop
  }

  render() {
    return (
      <div class='app-home'>
        <div class="svgContainer" innerHTML={this.svg}></div>
          <button onClick={async () => this.svg = await this.refreshSVG()}>
            refresh
          </button>
      </div>
    );
  }
}

