
class KnightTrapWeaveService {
    param_group: any;
    constructor() {}

    paramFactory(dim = 6){
        const params = {};
        params['trap_count'] = 3;
        params['canvas'] = this.getCanvasParams();
        params['grid'] = this.getGridParams(dim);
        params['knight'] = this.getKnightParams();
        params['weave'] = this.getWeaveParams();
        params['color']= this.getColorParams();
        console.log(dim,params)
        return params;
    }

    getCanvasParams(){
        return {
            "width": 400,
            "height": 400
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

    getKnightParams(){
        return {
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
    }

    getWeaveParams(){
        return {
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
    }

    getColorParams(){
        return {
            "domain":12,
            "palette": "Spectral",
            "background": "light-grey"
        }
    }

}
export const knightTrapWeaveService = new KnightTrapWeaveService();