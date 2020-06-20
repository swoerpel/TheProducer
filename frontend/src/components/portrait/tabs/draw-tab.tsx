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

    buttonGroupA(event){
        console.log('BGA',event)
    }

    buttonGroup = [
        'this',
        'that',
        'these',
        'those'
    ]

    render(){
        return (
            <div class='container'>
                <slider-input 
                    slider_title={'Slider Input'}
                    onValueChange={(event) => this.sliderA(event)}>
                </slider-input>
                <slider-input 
                    slider_title={'Slider Input'}
                    onValueChange={(event) => this.sliderA(event)}>
                </slider-input>
                <slider-input 
                    slider_title={'Slider Input'}
                    onValueChange={(event) => this.sliderA(event)}>
                </slider-input>
                <radio-button-input 
                    button_group_title={'Button Group'} 
                    button_group_data={...this.buttonGroup}
                    onButtonSelect={(event)=>this.buttonGroupA(event)}>
                </radio-button-input>
                <radio-button-input 
                    button_group_title={'Button Group'} 
                    button_group_data={...this.buttonGroup}
                    onButtonSelect={(event)=>this.buttonGroupA(event)}>
                </radio-button-input>
                <radio-button-input 
                    button_group_title={'Button Group'} 
                    button_group_data={...this.buttonGroup}
                    onButtonSelect={(event)=>this.buttonGroupA(event)}>
                </radio-button-input>
            </div>

        );
    }
}

