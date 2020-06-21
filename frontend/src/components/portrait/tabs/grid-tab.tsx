import { Component, h} from "@stencil/core";

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
            'Ordered',
            'Random'
        ]
    }

    private handleRowInput(event){
        console.log('row input',event.value)
    }
    private handleColumnInput(event){
        console.log('column input',event.value)
    }
    private handleDensityInput(event){
        console.log('density input',event.value)
    }
    private handlePopulationInput(event){
        console.log('population input',event.value)
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

