import { Component, h, State, EventEmitter, Event } from "@stencil/core";
import { knightTrapWeaveService } from "../../../services/knight_trap_weave.service";

@Component({
    tag: 'weave-input',
    styleUrl: 'weave-input.scss',
    shadow: true
})

export class FormGridSize{
    
    @Event() on_weave_input_update  : EventEmitter<any>;
    @State() hide_inputs = false;
    @State() width_count: number = 3;


    getGridSizeString(index){
        const r = knightTrapWeaveService.grid_sizes[index].rows
        const c = knightTrapWeaveService.grid_sizes[index].cols
        return `${r} x ${c}`;
      }

    toggleHideInputs(){
        console.log('this.hide_inputs',this.hide_inputs)
        this.hide_inputs = !this.hide_inputs;
    }

    setWidthCount(event){
        console.log('width_count',event.data)
        this.on_weave_input_update.emit({
            width_count: event.data
        })
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
                        <div class="sub-header">Width Count</div>
                        <input type="text" 
                               onInput={(event)=> this.setWidthCount(event)}
                               value={this.width_count}>
                            {this.width_count}
                        </input>
                    </div>
                    <div class="smooth-input-container"><div class="header">smooth settings</div></div>
                </div>
            </div>
        );
    }
}
