import { Component, h, Prop, State } from "@stencil/core";

@Component({
    tag: 'slider-input',
    styleUrl: 'slider-input.scss',
    shadow: true
})

export class SliderInput{
    @Prop() slider_title: string = "default";
    @Prop() slider_init: number = 50;
    @Prop() slider_min: number = 1;
    @Prop() slider_max: number = 100;
    @Prop() onValueChange: Function;
    @State() slider_value: number = this.slider_init;

    onInput(event){
        this.slider_value = event.target.value;
        this.onValueChange(event.target)
    }
    
    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.slider_title}</div>
                </div>
                <div class='sub-container value-container'>
                    <input type="text" class='value' value={this.slider_value}></input>
                </div>
                <div class='sub-container slider-container'>
                    <input  onInput={(event) => this.onInput(event)} 
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

