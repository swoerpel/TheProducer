

class PortraitContainer extends HTMLElement {
    constructor(){
        super();
        this.setTemplate()
    }

    setTemplate(){
        this.template = document.createElement('template');
        this.template.innerHTML = `
        <portrait-header></portrait-header>
        <portrait-image simulation_params="${this.paramFactory()}"></portrait-image>
        <portrait-image simulation_params="${this.paramFactory()}"></portrait-image>
        <portrait-image simulation_params="${this.paramFactory()}"></portrait-image>
        `
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );
    }

    paramFactory(){
        const params = {};
        params['trap_count'] = 3;
        params['canvas'] = {
            "width": 800,
            "height": 800
        }
        params['grid'] = {
            "cols": 12,
            "rows": 12,
            "max_value": 4,
            "max_value_step": 1,
            "increment_max_value": true,
            "random": true
        }
        params['knight'] = {
            "init":{
                "mode": "start",
                "x": 18,
                "y": 18
            },
            "jump":{
                "x":1,
                "y":1
            },
            "on": false,
            "mode": "squares",
            "alpha": 1,
            "border":{
                "on": false,
                "width":0.0,
                "color": "black",
                "alpha":1
            }
        }
        params['weave'] = {
            "queue_length": 5,
            "smooth":{
                "iter_start": 0,
                "iter_end": 8,
                "ratio":0.25
            },
            "on": true,
            "alpha": 1,
            "width":{
                "dynamic": true,
                "init":  0.5,
                "min": 0.25,
                "max": 1,
                "step": 0.25,
                "oss_freq": 1
            },
            "border":{
                "on": false,
                "width":0.1,
                "color": "black"
            }
        }
        params['jump'] = {
            "count":1000
        }
        params['color']={
            "domain":12,
            "palette": "Spectral",
            "background": "light-grey"
        }
        params['background'] = {
            "on": true,
            "color": "white"
        }
        return btoa(JSON.stringify(params))
    }
}

window.customElements.define('portrait-container',PortraitContainer);
