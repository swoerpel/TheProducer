import { Component, h, Prop, State,Element } from "@stencil/core";

@Component({
    tag: 'dropdown-input',
    styleUrl: 'dropdown-input.scss',
    shadow: true
})

export class DropdownInput{

    @Element() host: HTMLElement;
    @Prop() dropdown_title: string = 'default';
    @Prop() dropdown_data: string[];
    @Prop() onDropdownSelect: Function;
    @State() dropdown_value: string = this.dropdown_data[0];



    onInput(event){
        this.dropdown_value = event.target.value;
        this.onDropdownSelect(event.target.value)
    }
    

    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.dropdown_title}</div>
                </div>
                <div class='sub-container dropdown-container'>
                    <select class="dropdown" onInput={(event)=> this.onInput(event)} >{
                        this.dropdown_data.map((dropdown_value) =>
                            <option class="dropdown-option" 
                                    value={dropdown_value}>
                                {dropdown_value}
                            </option>
                        )
                    }</select>
                </div>
            </div>
        );
    }
}