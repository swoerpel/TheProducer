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

    dropdownListA(event){
        console.log('dropdown list', event)
    }

    radio_button_data={
        title:'Radio Button ',
        items:[
            'this',
            'that',
            'these',
            'these',
        ]
    }

    dropdown_data ={
        title: 'Dropdown Input',
        items:[
            'chet',
            'dave',
            'dreyfus',
            'chris',
            'john',
            'bentley',
            'phil'
        ],
    }

    slider_data={
        min: 1,
        max:100,
        init: 50,
        title: 'Slider Input'
    }

    render(){
        return (
            <div class='container'>
                <slider-input 
                    data={this.slider_data}
                    onValueChange={(event) => this.sliderA(event)}>
                </slider-input>
                <radio-button-input 
                    data={this.radio_button_data}
                    onValueChange={(event)=>this.buttonGroupA(event)}>
                </radio-button-input>
                <dropdown-input
                    data={this.dropdown_data}
                    onValueChange={(event)=>this.dropdownListA(event)}>
                </dropdown-input>
            </div>

        );
    }
}

