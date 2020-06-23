import { Component, h, State,Event} from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
    tag: 'color-tab',
    styleUrl: 'color-tab.scss',
    shadow: true
})

export class ColorTab{

    consistency_input_data = {
        title: 'Consistency',
        min:2,
        max: 32,
        init: 6,
    }

    background_color_input_data = {
        title: 'Background',
        init: 'white',
    }


    @Event() on_color_input_change: EventEmitter<any>;

    @State() input_values = {
        consistency: this.consistency_input_data.init,
        background: this.background_color_input_data.init,
    }

    componentShouldUpdate() {
        this.on_color_input_change.emit(this.input_values)
    }

    componentWillLoad() {
        this.on_color_input_change.emit(this.input_values)
    }

    private handleConsistencyInput(value){
        this.input_values = {
            ...this.input_values,
            consistency: value,
        }    
    }

    private handleBackgroundColorInput(value){
        this.input_values = {
            ...this.input_values,
            background: value,
        }    
    }

    render(){
        return (
            <div class='container'>
                <slider-input 
                    data={this.consistency_input_data}
                    onValueChange={(event) => this.handleConsistencyInput(event)}>
                </slider-input>
                <color-picker-input
                    data={this.background_color_input_data}
                    onValueChange={(event) => this.handleBackgroundColorInput(event)}>
                </color-picker-input>
            </div>
        );
    }
}

