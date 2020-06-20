import { Component, h, Prop, State,Element, Listen } from "@stencil/core";

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

    constructor(){

    }


    onInput(dropdown_value){
        console.log('eventeventevent',event)
        this.dropdown_value = dropdown_value;
        this.onDropdownSelect(dropdown_value)
        this.host.shadowRoot.getElementById("myDropdown").classList.toggle("show");

    }

    toggleDropdown(){
        this.host.shadowRoot.getElementById("myDropdown").classList.toggle("show");
    }

    @Listen('window:click')
    handleClick(event){
        console.log('event',event)

        if (!event.target.matches('.dropbtn')) {
                var dropdowns = this.host.getElementsByClassName("dropdown-content");
            console.log('dropdowns',dropdowns)
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    render(){
        return (
            <div class='container'>
                <div class='sub-container header-container'>
                    <div class='header'>{this.dropdown_title}</div>
                </div>
                <div class="dropdown-container sub-container">
                    
                <button onClick={()=>this.toggleDropdown()} class="dropbtn">{this.dropdown_value}</button>
                <div id="myDropdown" class="dropdown-content">{
                    this.dropdown_data.map((dropdown_value) =>
                        <a onClick={(event)=>this.onInput(dropdown_value)}>{dropdown_value}</a>
                    )
                }</div>
                </div>
            </div>
        );
    }
}