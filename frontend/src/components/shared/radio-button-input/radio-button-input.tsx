import { Component, h, Prop, State,Element } from "@stencil/core";

@Component({
    tag: 'radio-button-input',
    styleUrl: 'radio-button-input.scss',
    shadow: true
})

export class RadioButtonInput{

    @Element() host: HTMLElement;
    @Prop() button_group_title: string = 'default';
    @Prop() button_group_data: string[];
    @Prop() onButtonSelect: Function;
    @State() button_value: number = 0;

    private root_button_id: string = 'b'

    constructor(){
        console.log('button_group_data',this.button_group_data)
    }

    onButtonClick(selected_button, button_index){
        for(let i = 0; i < this.button_group_data.length; i++){
            if(i !== button_index){
                let unselected_button = this.host.shadowRoot.getElementById(this.root_button_id + i.toString())
                unselected_button.classList.remove('selected')
                unselected_button.classList.add('unselected')
                unselected_button.classList.add('unselected:hover')
            }
        }
        selected_button.classList.remove('unselected')
        selected_button.classList.remove('unselected:hover')
        selected_button.classList.add('selected')
        this.button_value = button_index
        this.onButtonSelect(this.button_group_data[button_index])
    }
    
    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.button_group_title}</div>
                </div>
                <div class='sub-container button-group'>{
                    this.button_group_data.map((button_title, button_index) =>
                        <button class="unselected" id={this.root_button_id + button_index.toString()} 
                                onClick={(event)=>this.onButtonClick(event.target,button_index)}>
                            {button_title}
                        </button>)}
                </div>
            </div>
        );
    }
}


// onTabSelect(selected_tab,tab_id) {
//     this.tab_ids.filter((id) => id !== tab_id).forEach((tab_id) => { 
//       let tab_element = this.host.shadowRoot.getElementById(tab_id + '-tab')
//       tab_element.style['background-color'] = 'black';
//       tab_element.style['color'] = 'white';
//       let tab_content_element = this.host.shadowRoot.getElementById(tab_id);
//       tab_content_element.style.display = "none"
//     })
//     this.host.shadowRoot.getElementById(tab_id).style.display = "flex";
//     selected_tab.style['background-color'] = '#ddd';
//     selected_tab.style['color'] = 'black';
// }

