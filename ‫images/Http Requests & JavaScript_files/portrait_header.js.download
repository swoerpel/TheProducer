const portrait_header_template = document.createElement('template');
portrait_header_template.innerHTML = `
<link rel="stylesheet" href="css/portrait-header.css">
<div class="container">Portrait Header Here</div>
`

class PortraitHeader extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            portrait_header_template.content.cloneNode(true)
        );
    }
}
window.customElements.define('portrait-header',PortraitHeader);
