const portrait_template = document.createElement('template');
portrait_template.innerHTML = `
    <link rel="stylesheet" href="./portrait.css">
    <button id="generateSVG">Generate SVG</button>
    <div id="dynImg" class="svgContainer"></div>
`

class Portrait extends HTMLElement {
    constructor(){
        super();
        this.shared = new Shared();
        console.log('simulation_params',simulation_params)
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            portrait_template.content.cloneNode(true)
        );
    }

    async connectedCallback() {
        this.shadowRoot.querySelector('#dynImg').innerHTML = 
            await this.sendHttpRequest(
                'POST', 
                'http://localhost:8080/knight_trap_weave', 
                simulation_params
            ); 
    }

    sendHttpRequest = async (method, url, data) => {
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

window.customElements.define('app-portrait',Portrait);