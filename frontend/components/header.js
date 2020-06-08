const header_template = document.createElement('template');
header_template.innerHTML = `
<div class="container">Header Here</div>
`

class Header extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            header_template.content.cloneNode(true)
        );
    }
}

window.customElements.define('app-header',Header);
