import { Component, h, State } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { knightTrapWeaveService } from '../../services/knight_trap_weave.service';

@Component({
  tag: 'portrait-settings',
  styleUrl: 'portrait-settings.css',
  shadow: true
})

export class PortraitSettings {

  @Event() refresh_params: EventEmitter; 

  @State() value: string;
  @State() canvasOptions: any[] = [
    { 'id': 1, 'len': 1200},
    { 'id': 2, 'len': 600 },
    { 'id': 3, 'len': 400 },
    { 'id': 4, 'len': 300 }
  ];

  handleSubmit(e) {
    this.refresh_params.emit(this.value)
    e.preventDefault()
    // knightTrapWeaveService.setValue(this.value)
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  render() {
    return (
      <div class='portrait-settings'>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            <input type="text" value={this.value} onInput={(event) => this.handleChange(event)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

