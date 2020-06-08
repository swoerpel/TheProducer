const portrait_container_template = document.createElement('template');
portrait_container_template.innerHTML = `
<portrait-header></portrait-header>
<portrait-image></portrait-image>
`

class PortraitContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            portrait_container_template.content.cloneNode(true)
        );
    }
}

window.customElements.define('portrait-container',PortraitContainer);
