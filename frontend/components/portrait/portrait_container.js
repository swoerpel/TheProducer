

class PortraitContainer extends HTMLElement {
    constructor(){
        super();
        this.template = document.createElement('template');
        this.createGrid();
        this.setTemplate();
    }

    createGrid(){
    }


    // <portrait-image class="image" simulation_params="${this.paramFactory(4)}"></portrait-image>
    // <portrait-image class="image" simulation_params="${this.paramFactory(8)}"></portrait-image>
    // <portrait-image class="image" simulation_params="${this.paramFactory(12)}"></portrait-image>

    setTemplate(){
        this.appendPortrait(6)
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );
    }
    appendPortrait(grid_len){
        this.template.innerHTML += `
        <portrait-header></portrait-header>
        <link rel="stylesheet" href="css/portrait-container.css">
        <div id="image-grid" class="image-grid">
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>
        <portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>`
        this.template.innerHTML+= '</div>'
        // for(let i = 0; i < 9; i++){
        //     this.template.innerHTML+= `<portrait-image class="image" simulation_params="${this.paramFactory(grid_len)}"></portrait-image>`
        // }
        // this.template.innerHTML+=
    }

    getCanvasParams(){
        return {
            "width": 800,
            "height": 800
        }
    }

    getGridParams(dim){
        return {
            "cols": dim,
            "rows": dim,
            "max_value": 4,
            "max_value_step": 1,
            "increment_max_value": true,
            "random": true
        }
    }

    paramFactory(dim){
        const params = {};
        params['trap_count'] = 3;
        params['canvas'] = this.getCanvasParams();
        params['grid'] = this.getGridParams(dim);
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
