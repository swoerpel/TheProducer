import { Component, h, State,Event} from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
    tag: 'weave-tab',
    styleUrl: 'weave-tab.scss',
    shadow: true
})

export class WeaveTab{

    min_width_input_data = {
        title: 'Min Width',
        min:1,
        max: 100,
        init: 25,
    }

    max_width_input_data = {
        title: 'Max Width',
        min:1,
        max: 100,
        init: 75,
    }

    width_segments_input_data = {
        title: 'Width Segments',
        min:2,
        max: 8,
        init: 4,
    }

    frequency_oss_input_data = {
        title: 'Oscillation Freq',
        min:1,
        max: 100,
        init: 50,
    }

    drawing_style_input_data = {
        title: 'Draw Style',
        items:[
            'Smooth',
            'Chaotic',
            'Strong',
            'Weak',
        ]
    }

    @Event() on_weave_input_change: EventEmitter<any>;

    @State() input_values = {
        drawing_style: this.drawing_style_input_data.items[0],
        width:{
            min: this.min_width_input_data.init,
            max: this.max_width_input_data.init,
            segments: this.width_segments_input_data.init,
            frequency_oss: this.frequency_oss_input_data.init,
        },
    }

    componentShouldUpdate() {
        this.on_weave_input_change.emit(this.input_values)
    }

    componentWillLoad() {
        this.on_weave_input_change.emit(this.input_values)
    }

    private handleDrawingStyleInput(value){
        this.input_values = {
            ...this.input_values,
            drawing_style: value,
        }    
    }

    private handleMinWidthInput(value){
        this.input_values = {
            ...this.input_values,
            width:{
                ...this.input_values.width,
                min: value,
            }
        }    
    }

    private handleMaxWidthInput(value){
        this.input_values = {
            ...this.input_values,
            width:{
                ...this.input_values.width,
                max: value,
            }
        }    
    }

    private handleWidthSegmentsInput(value){
        this.input_values = {
            ...this.input_values,
            width:{
                ...this.input_values.width,
                segments: value,
            }
        }    
    }

    private handleFrequencyOssInput(value){
        this.input_values = {
            ...this.input_values,
            width:{
                ...this.input_values.width,
                frequency_oss: value,
            }
        }    
    }

    render(){
        return (
            <div class='container'>
                <slider-input 
                    data={this.min_width_input_data}
                    onValueChange={(event) => this.handleMinWidthInput(event)}>
                </slider-input>
                <slider-input 
                    data={this.max_width_input_data}
                    onValueChange={(event) => this.handleMaxWidthInput(event)}>
                </slider-input>
                <slider-input 
                    data={this.width_segments_input_data}
                    onValueChange={(event) => this.handleWidthSegmentsInput(event)}>
                </slider-input>
                <slider-input 
                    data={this.frequency_oss_input_data}
                    onValueChange={(event) => this.handleFrequencyOssInput(event)}>
                </slider-input>
                <radio-button-input
                    data={this.drawing_style_input_data}
                    onValueChange={(event) => this.handleDrawingStyleInput(event)}>
                </radio-button-input>
            </div>
        );
    }
}

