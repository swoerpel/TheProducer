import { Component, h, State, EventEmitter, Event } from "@stencil/core";
import { knightTrapWeaveService } from "../../../services/knight_trap_weave.service";

@Component({
    tag: 'weave-input',
    styleUrl: 'weave-input.scss',
    shadow: true
})

export class FormGridSize{
    
    @State() grid_size_index: number = 0;
    @Event() on_grid_size_select  : EventEmitter<number>;
    @State() hide_inputs = false;

    getGridSizeString(index){
        const r = knightTrapWeaveService.grid_sizes[index].rows
        const c = knightTrapWeaveService.grid_sizes[index].cols
        return `${r} x ${c}`;
      }
    
    setGridSizeIndex(event){
        this.grid_size_index = event.target.value
        this.on_grid_size_select.emit(this.grid_size_index)
    }

    toggleHideInputs(){
        console.log('this.hide_inputs',this.hide_inputs)
        this.hide_inputs = !this.hide_inputs;
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
                    <div class="width-input-container"><div class="header">width settings</div></div>
                    <div class="smooth-input-container"><div class="header">smooth settings</div></div>
                </div>
            </div>
        );
    }
}
