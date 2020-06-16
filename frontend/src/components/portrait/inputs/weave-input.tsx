import { Component, h, State, EventEmitter, Event } from "@stencil/core";
import { knightTrapWeaveService } from "../../../services/knight_trap_weave.service";
// import { noUiSlider } from 'nouislider';
import 'nouislider/distribute/nouislider.css';

@Component({
    tag: 'weave-input',
    styleUrl: 'weave-input.scss',
    shadow: true
})

export class FormGridSize{

    @Event() on_weave_input_change  : EventEmitter<any>;
    @State() hide_inputs = false;
    @State() width_low: number = 25;
    @State() width_high: number = 100;
    @State() width_divisions: number = 3;


    getGridSizeString(index){
        const r = knightTrapWeaveService.grid_sizes[index].rows
        const c = knightTrapWeaveService.grid_sizes[index].cols
        return `${r} x ${c}`;
      }

    toggleHideInputs(){
        this.hide_inputs = !this.hide_inputs;
    }

    setWidthValue(event, field){
        if(event.data){
            if(field === 'low')
                this.width_low =  parseInt(event.target.value)
            if(field === 'high')
                this.width_high =  parseInt(event.target.value)
            if(field === 'divisions')
                this.width_divisions =  parseInt(event.target.value)
            this.on_weave_input_change.emit({
                width:{
                    low:this.width_low,
                    high: this.width_high,
                    divisions: this.width_divisions,
                }
            })
        }
    }

    render(){
        return (
            <div class='container'>
                <div class="header-container">
                    <div class="header">Weave</div>
                    <button onClick={() =>this.toggleHideInputs()} class='show-hide-button'>
                        {this.hide_inputs ? 'show' : 'hide'}
                    </button>
                </div>
                <div class={this.hide_inputs ? 'input-container-hide':"input-container-show"}>
                    <div class="width-input-container">
                        <div class="sub-header"><strong>Width: </strong></div>
                        <div class="sub-header"> Low:</div>
                        <input type="text" 
                               class="width-input" 
                               onInput={(event)=> this.setWidthValue(event,'low')} 
                               value={this.width_low}> 
                            {this.width_low}
                        </input>
                        <div class="sub-header"> High:</div>
                        <input type="text" 
                               class="width-input" 
                               onInput={(event)=> this.setWidthValue(event,'high')} 
                               value={this.width_high}> 
                            {this.width_high}
                        </input>
                        <div class="sub-header"> Divisions:</div>
                        <input type="text" 
                               class="width-input" 
                               onInput={(event)=> this.setWidthValue(event,'divisions')} 
                               value={this.width_divisions}> 
                            {this.width_divisions}
                        </input>
                    </div>
                </div>
            </div>
        );
    }
}
