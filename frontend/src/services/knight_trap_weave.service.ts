
class KnightTrapWeaveService {
    param_group: any;

    public default_params = {
        trap_count: 4,
        canvas: {
            "width": 800,
            "height": 800
        },
        grid: {
            "cols": 6,
            "rows": 6,
            "max_value": 4,
            "max_value_step": 1,
            "increment_max_value": true,
            "population": 'Ordered'
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

    weaveDrawStyleLUT = {
        'Smooth':0.25,
        'Chaotic': 0.978,
        'Strong': 1,
        'Weak': 0.499
    }



    constructor() {}

    // converts user input params to api request params
    convertParams(user_params:any){
        console.log('user_params',user_params,)
        const params = {};
        params['trap_count'] = user_params.grid.density;
        params['canvas'] = {
            ...this.default_params.canvas
        }
        params['grid'] = {
            ...this.default_params.grid,
            rows: user_params.grid.rows,
            cols:  user_params.grid.cols,
            population: user_params.grid.population,
        }
        params['knight'] = {
            ...this.default_params.knight,
            init:{
                ...this.default_params.knight.init,
                mode: user_params.knight.start_point
            },
            jump:{
                ...this.default_params.knight.jump,
                x: user_params.knight.jump_x,
                y: user_params.knight.jump_y,
            }
        }
        params['weave'] = {
            ...this.default_params.weave,
            width:{
                ...this.default_params.weave.width,
                min: user_params.weave.width.min / 100,
                max: user_params.weave.width.max / 100,
                step: this.calculateStep(
                    user_params.weave.width.min,
                    user_params.weave.width.max, 
                    user_params.weave.width.segments
                ),
                oss_freq: parseInt(user_params.weave.width.frequency_oss),
            },
            smooth:{
                ...this.default_params.weave.smooth,
                ratio: this.weaveDrawStyleLUT[user_params.weave.drawing_style]
            }
            // width: this.convertWeaveParams(user_params.weave)
            // width: setWeaveWidth(user_params.width_count)
        }
        params['color']= {
            ...this.default_params.color,
            domain: user_params.color.consistency,
            // palette: user_params.color_palette,
        }
        return params;
    }

    calculateStep(min, max, divs){
        return ((max - min) / (divs - 1)) / 100
    }

    convertWeaveParams(weave_params){
        const min = weave_params.width.low / 100;
        const max = weave_params.width.high / 100;
        const step = (max - min) / (weave_params.width.divisions - 1)
        return {
            dynamic: true,
            init: (min + max) / 2,
            min: min,
            max: max,
            oss_freq: 1,
            step: step
        }
    }

}
export const knightTrapWeaveService = new KnightTrapWeaveService();