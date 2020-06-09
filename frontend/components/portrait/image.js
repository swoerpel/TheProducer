const portrait_image_template = document.createElement('template');
portrait_image_template.innerHTML = `
    <link rel="stylesheet" href="css/portrait.css">
    <div id="image" class="svgContainer"></div>
`

class PortraitImage extends HTMLElement {
    constructor(){
        super();
        this.shared = new Shared();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            portrait_image_template.content.cloneNode(true)
        );
    }

    async connectedCallback() {
        this.shadowRoot.querySelector('#image').innerHTML = 
            await this.sendHttpRequest(
                'POST', 
                'http://localhost:8080/knight_trap_weave', 
                JSON.parse(atob(this.getAttribute('simulation_params')))
            ); 
    }

    sendHttpRequest = async (method, url, data) => {
        console.log('portrait-image request -> ',data)
        let result = '';
        let utf8ArrayToStr = this.shared.Utf8ArrayToStr;
        return fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: data ? { 'Content-Type': 'application/json' } : {}
        }).then(response => {
            const reader = response.body.getReader();
            return reader.read().then(function processText({ done, value }) {
                if (done) 
                    return result;
                result = result.concat(utf8ArrayToStr(value));
                return reader.read().then(processText);
            });
        });
    }
}
PortraitImage.observedAttributes = ['simulation_params']
window.customElements.define('portrait-image',PortraitImage);