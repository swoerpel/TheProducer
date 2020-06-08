const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="./portrait.css">
    <button id="generateSVG">Generate SVG</button>
    <div id="dynImg" class="svgContainer"></div>
`

var Utf8ArrayToStr = (array) => {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
        case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
        case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
        break;
    }
    }
    return out;
}

class Portrait extends HTMLElement {
    constructor(){
        super();
        console.log('simulation_params',simulation_params)
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
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
        return fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: data ? { 'Content-Type': 'application/json' } : {}
        }).then(response => {
            const reader = response.body.getReader();
            return reader.read().then(function processText({ done, value }) {
                if (done) 
                    return result;
                result = result.concat(Utf8ArrayToStr(value));
                return reader.read().then(processText);
            });
        });
    }
}

window.customElements.define('app-portrait',Portrait);