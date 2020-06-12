import { Component, h, State, EventEmitter, Event } from "@stencil/core";
import { knightTrapWeaveService } from "../../../services/knight_trap_weave.service";

@Component({
    tag: 'form-grid-size',
    styleUrl: 'grid-size.scss',
    shadow: true
})

export class FormGridSize{
    
    @State() grid_size_index: number = 0;
    @Event() on_grid_size_select  : EventEmitter<number>;

    getGridSizeString(index){
        const r = knightTrapWeaveService.grid_sizes[index].rows
        const c = knightTrapWeaveService.grid_sizes[index].cols
        return `${r} x ${c}`;
      }
    
    setGridSizeIndex(event){
        this.grid_size_index = event.target.value
        this.on_grid_size_select.emit(this.grid_size_index)
    }

    render(){
        return (
            <div class='container'>
                <div class="container header">Grid Size</div>
                <select onInput={(event)=> this.setGridSizeIndex(event)} id="grid-size" name="grid-sizes">{
                knightTrapWeaveService.grid_sizes.map((grid_size,index) =>
                    <option class="container option" value={index}>{this.getGridSizeString(index)}</option>
                )
                }
                </select>
            </div>
        );
    }
}

