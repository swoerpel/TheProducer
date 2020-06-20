import { Component, h, Listen } from "@stencil/core";

@Component({
    tag: 'draw-tab',
    styleUrl: 'draw-tab.scss',
    shadow: true
})

export class ParentComponent{
    sliderA(event){
        console.log('SA', event.value)
    }
    sliderB(event){
        console.log('SB', event.value)
    }
    sliderC(event){
        console.log('SC', event.value)
    }

    render(){
        return (
            <div class='container'>
                <slider-input onSliderValueChange={(event) => this.sliderA(event)} 
                              slider_title={'S1'}
                              slider_id={'slider_A'} ></slider-input>
                <slider-input onSliderValueChange={(event) => this.sliderB(event)} 
                              slider_title={'S2'}
                              slider_id={'slider_B'} ></slider-input>
                <slider-input onSliderValueChange={(event) => this.sliderC(event)} 
                              slider_title={'S3'}
                              slider_id={'slider_C'} ></slider-input>
            </div>
        );
    }
}

