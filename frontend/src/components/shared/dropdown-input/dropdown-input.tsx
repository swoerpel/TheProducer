import { Component, h, Prop, State,Element } from "@stencil/core";

@Component({
    tag: 'dropdown-input',
    styleUrl: 'dropdown-input.scss',
    shadow: true
})

export class DropdownInput{

    @Element() host: HTMLElement;
    @Prop() data: {title:string, items: string[]};
    @Prop() onValueChange: Function;
    @State() dropdown_value: string = this.data.items[0];

    onInput(dropdown_value){
        this.dropdown_value = dropdown_value;
        this.onValueChange(dropdown_value)
        this.host.shadowRoot.getElementById("myDropdown").classList.toggle("show");
    }

    toggleDropdown(){
        this.host.shadowRoot.getElementById("myDropdown").classList.toggle("show");
    }

    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.data.title}</div>
                </div>
                <div class="dropdown-container sub-container">
                    <button onClick={()=>this.toggleDropdown()} class="dropbtn">{this.dropdown_value}</button>
                    <div id="myDropdown" class="dropdown-content">{
                        this.data.items.map((dropdown_value) =>
                            <a onClick={()=>this.onInput(dropdown_value)}>{dropdown_value}</a>
                        )
                    }</div>
                </div>
            </div>
        );
    }
}