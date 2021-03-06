import { Component, h, Prop, State,Element } from "@stencil/core";

@Component({
    tag: 'radio-button-input',
    styleUrl: 'radio-button-input.scss',
    shadow: true
})

export class RadioButtonInput{

    @Element() host: HTMLElement;
    @Prop() data: {title:string, items: string[]};
    @Prop() onValueChange: Function;
    @State() button_index: number = 0;

    private root_button_id: string = 'b'

    onInput(selected_button, button_index){
        for(let i = 0; i < this.data.items.length; i++){
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
        this.button_index = button_index
        this.onValueChange(this.data.items[button_index])
    }
    
    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.data.title}</div>
                </div>
                <div class='sub-container button-group'>{
                    this.data.items.map((button_title, button_index) => {
                        const button_class = (button_index === this.button_index) ? "selected" : "unselected"
                        return (
                            <button onClick={(event)=>this.onInput(event.target,button_index)}
                                    class={button_class} 
                                    id={this.root_button_id + button_index.toString()}>{button_title}
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }
}