import { Component, h, State,Event} from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
    tag: 'grid-tab',
    styleUrl: 'grid-tab.scss',
    shadow: true
})

export class GridTab{


    row_input_data = {
        title: 'Rows',
        min:4,
        max: 64,
        init: 6,
    }

    column_input_data = {
        title: 'Columns',
        min:4,
        max: 64,
        init: 6,
    }

    density_input_data = {
        title: 'Density',
        min:1,
        max: 10,
        init: 3,
    }

    population_input_data = {
        title: 'Population',
        items:[
            'Random',
            'Ordered',
        ]
    }

    @Event() on_grid_input_change: EventEmitter<any>;

    @State() input_values = {
        rows: this.row_input_data.init,
        cols: this.column_input_data.init,
        density: this.density_input_data.init,
        population: this.population_input_data.items[0],
    }

    componentShouldUpdate() {
        this.on_grid_input_change.emit(this.input_values)
    }

    componentWillLoad() {
        this.on_grid_input_change.emit(this.input_values)
    }

    private handleRowInput(value){
        this.input_values = {
            ...this.input_values,
            rows: value,
        }    
    }

    private handleColumnInput(value){
        this.input_values = {
            ...this.input_values,
            cols: value,
        }
    }

    private handleDensityInput(value){
        this.input_values = {
            ...this.input_values,
            density: value,
        }
    }
    private handlePopulationInput(value){
        this.input_values = {
            ...this.input_values,
            population: value,
        }
    }

    render(){
        return (
            <div class='container'>
                <slider-input 
                    data={this.row_input_data}
                    onValueChange={(event) => this.handleRowInput(event)}>
                </slider-input>
                <slider-input 
                    data={this.column_input_data}
                    onValueChange={(event) => this.handleColumnInput(event)}>
                </slider-input>
                <slider-input 
                    data={this.density_input_data}
                    onValueChange={(event) => this.handleDensityInput(event)}>
                </slider-input>
                <radio-button-input 
                    data={this.population_input_data}
                    onValueChange={(event)=>this.handlePopulationInput(event)}>
                </radio-button-input>
            </div>
        );
    }
}

