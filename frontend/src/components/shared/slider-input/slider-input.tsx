import { Component, h, Prop, State } from "@stencil/core";

@Component({
    tag: 'slider-input',
    styleUrl: 'slider-input.scss',
    shadow: true
})

export class SliderInput{
    @Prop() data: {min:number,max:number,init:number,title:string};
    @Prop() onValueChange: Function;
    @State() slider_value: number = this.data.init;

    onInput(event){
        this.slider_value = event.target.value;
        this.onValueChange(event.target)
    }
    
    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.data.title}</div>
                </div>
                <div class='sub-container value-container'>
                    <input type="text" class='value' value={this.slider_value}></input>
                </div>
                <div class='sub-container slider-container'>
                    <input  onInput={(event) => this.onInput(event)} 
                            type="range" 
                            min={this.data.min} 
                            max={this.data.max} 
                            value={this.data.init} 
                            class="slider" />
                </div>
            </div>
        );
    }
}

