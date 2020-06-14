
class KnightTrapWeaveService {
    param_group: any;

    public grid_sizes = [
        {rows:4,cols:4},
        {rows:5,cols:5},
        {rows:6,cols:6},
        {rows:7,cols:7},
        {rows:8,cols:8},
        {rows:16,cols:16},
        {rows:32,cols:32},
    ];

    public defaultParams = {
        trap_count: 4,
        canvas: {
            "width": 800,
            "height": 800
        },
        grid: {
            "cols": this.grid_sizes[0].cols,
            "rows": this.grid_sizes[0].rows,
            "max_value": 4,
            "max_value_step": 1,
            "increment_max_value": true,
            "random": true
        },
        weave:{
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
        },
        knight: {
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
        },
        color:{
            "domain":12,
            "palette": 'Spectral',
            "background": "light-grey"
        }
    }

    constructor() {}

    paramFactory(options = {grid_size_index:0,color_palette:'Spectral'}){
        const params = {};
        params['trap_count'] = 3;
        params['canvas'] = this.getCanvasParams();
        params['grid'] = this.getGridParams(options.grid_size_index);
        params['knight'] = this.getKnightParams();
        params['weave'] = this.getWeaveParams();
        params['color']= this.getColorParams(options.color_palette);
        return params;
    }

    getCanvasParams(){
        return {
            "width": 800,
            "height": 800
        }
    }

    getGridParams(index){
        return {
            "cols": this.grid_sizes[index].cols,
            "rows": this.grid_sizes[index].rows,
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

    getColorParams(palette = 'Spectral'){
        return {
            "domain":12,
            "palette": palette,
            "background": "light-grey"
        }
    }

}
export const knightTrapWeaveService = new KnightTrapWeaveService();