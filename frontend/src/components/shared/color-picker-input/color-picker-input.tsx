import { Component, h, Prop, State } from "@stencil/core";

@Component({
    tag: 'color-picker-input',
    styleUrl: 'color-picker-input.scss',
    shadow: true
})

export class ColorPickerInput{
    @Prop() data: {title:string,init:string};
    @Prop() onValueChange: Function;
    @State() color_value: string = this.data.init;

    onInput(event){
        this.color_value = event.target.value;
        this.onValueChange(event.target.value)
    }
    
    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.data.title}</div>
                </div>
                <div class='sub-container color-select-container'>
                    <div class='color-select'></div>
                </div>
            </div>
        );
    }
}

