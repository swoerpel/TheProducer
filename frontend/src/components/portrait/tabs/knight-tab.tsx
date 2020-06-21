import { Component, h, State,Event} from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
    tag: 'knight-tab',
    styleUrl: 'knight-tab.scss',
    shadow: true
})

export class KnightTab{

    start_point_input_data = {
        title: 'Start Point',
        items:[
            'center',
            'random',
            'start',
        ]
    }

    jump_x_input_data = {
        title: 'Jump X',
        min:1,
        max: 4, //should be dynamic with grid size
        init: 1,
    }

    jump_y_input_data = {
        title: 'Jump Y',
        min:1,
        max: 4, //should be dynamic with grid size
        init: 1,
    }


    @Event() on_knight_input_change: EventEmitter<any>;

    @State() input_values = {
        start_point: this.start_point_input_data.items[0],
        jump_x: this.jump_x_input_data.init,
        jump_y: this.jump_y_input_data.init,
    }

    componentShouldUpdate() {
        this.on_knight_input_change.emit(this.input_values)
    }

    componentWillLoad() {
        this.on_knight_input_change.emit(this.input_values)
    }

    private handleStartPointInput(value){
        this.input_values = {
            ...this.input_values,
            start_point: value,
        }    
    }

    private handleJumpXInput(value){
        this.input_values = {
            ...this.input_values,
            jump_x: value,
        }    
    }

    private handleJumpYInput(value){
        this.input_values = {
            ...this.input_values,
            jump_y: value,
        }    
    }

  
    render(){
        return (
            <div class='container'>
                <radio-button-input 
                    data={this.start_point_input_data}
                    onValueChange={(event)=>this.handleStartPointInput(event)}>
                </radio-button-input>
                <slider-input 
                    data={this.jump_x_input_data}
                    onValueChange={(event) => this.handleJumpXInput(event)}>
                </slider-input>
                <slider-input 
                    data={this.jump_y_input_data}
                    onValueChange={(event) => this.handleJumpYInput(event)}>
                </slider-input>
            </div>
        );
    }
}

