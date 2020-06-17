import { Component, h, State, EventEmitter, Event } from "@stencil/core";
import { knightTrapWeaveService } from "../../../services/knight_trap_weave.service";

@Component({
    tag: 'grid-tab',
    styleUrl: 'grid-tab.scss',
    shadow: true
})

export class GridTab{

    private population_modes = [
        'random',
        'ordered'
    ]

    @State() grid_size_index: number = 0;
    @State() density_value: number = 50;
    @State() population_mode: number = 0;
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

    setDensityValue(event){
        this.density_value = event.target.value
    }

    setPopulationMode(event){
        this.population_mode = event.target.value;
    }

    render(){
        return (
            <div class='container'>
                <div class='input-container'>
                    <div class="section-header">Size</div>
                    <input type="text" class='size-value' value={this.getGridSizeString(this.grid_size_index)}></input>
                    <select onInput={(event)=> this.setGridSizeIndex(event)} id="grid-size" name="grid-sizes">{
                        knightTrapWeaveService.grid_sizes.map((grid_size,index) =>
                            <option class="container option" value={index}>{this.getGridSizeString(index)}</option>
                        )}
                    </select>
                </div>
                <div class='input-container'>
                    <div class="section-header">Density</div>
                    <div class="density-slider-container">
                        <input type="range" min="1" max="100" value="50" 
                               class="density-slider" onInput={(event) => this.setDensityValue(event)}/>
                    </div>
                    <input type="text" class='density-slider-value' value={this.density_value}></input>
                </div>
                <div class='input-container'>
                    <div class="section-header">Population</div>
                    <div class="population-dropdown-container">
                    <select onInput={(event)=> this.setPopulationMode(event)} id="grid-size" name="grid-sizes">{
                        this.population_modes.map((population_mode, index) =>
                            <option class="container option" value={index}>{population_mode}</option>
                        )}
                    </select>
                    </div>
                </div>
            </div>
        );
    }
}

