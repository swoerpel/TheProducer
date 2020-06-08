const portrait_container_template = document.createElement('template');
portrait_container_template.innerHTML = `
<app-portrait></app-portrait>
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

window.customElements.define('app-portrait-container',PortraitContainer);
