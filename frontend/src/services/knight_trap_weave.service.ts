
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

    public default_params = {
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

    // converts user input params to api request params
    convertParams(user_params:any){
        console.log('user_params',user_params,)
        console.log('this.default_params.weave',this.default_params.weave)
        const params = {};
        params['trap_count'] = this.default_params.trap_count
        params['canvas'] = {
            ...this.default_params.canvas
        }
        params['grid'] = {
            ...this.default_params.grid,
            rows: this.grid_sizes[user_params.grid_size_index].rows,
            cols: this.grid_sizes[user_params.grid_size_index].rows,
        }
        params['knight'] = {
            ...this.default_params.knight
        }
        params['weave'] = {
            ...this.default_params.weave,
            // width: setWeaveWidth(user_params.width_count)
        }
        params['color']= {
            ...this.default_params.color,
            palette: user_params.color_palette,
        }
        return params;
    }

    setWeaveWidth(width_count){

    }

}
export const knightTrapWeaveService = new KnightTrapWeaveService();