import { Component, h, Prop, State } from "@stencil/core";

@Component({
    tag: 'slider-input',
    styleUrl: 'slider-input.scss',
    shadow: true
})

export class Slider{

    @Prop() title: string = "default";
    @Prop() slider_min: number = 1;
    @Prop() slider_max: number = 100;
    @Prop() slider_init: number = 50;

    @State() slider_value: number = this.slider_init;

    @State() on_slider_value_change

    onValueChange(change){
        this.slider_value = change.value;

    }

    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.title}</div>
                </div>
                <div class='sub-container value-container'>
                    <input type="text" class='value' value={this.slider_value}></input>
                </div>
                <div class='sub-container slider-container'>
                    <input  onInput={(event) => this.onValueChange(event.target)} 
                            type="range" 
                            min={this.slider_min} 
                            max={this.slider_max} 
                            value={this.slider_init} 
                            class="slider" />
                </div>
            </div>
        );
    }
}

