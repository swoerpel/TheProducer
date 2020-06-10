import { Cell, Point, Rect } from "./models";
import { arrSum, SmoothLine } from "./helpers";
import * as chroma from 'chroma.ts';

export class Weave{
    grid: Cell[][] = [];
    grid_sum: number; 
    start_grid_sum: number;
    cell_width: number;
    cell_height: number;
    jump_count: number = 0;
    cell_count: number = 0;
    direction: Partial<Point> = {
        x: 0,
        y: 0
    }
    knightStartLUT: any = {

    };

    knight_x: number;
    knight_y: number;
    weave_queue: Point[];
    knight_jump_offsets: {x:number;y:number}[] = [];

    constructor(
        private params : any,
        private color_machine: any
    ){
        this.Refresh();
    }

    public Refresh(): void{
        this.RefreshKnightPosition();
        this.RefreshKnightOffsets();
        this.RefreshGrid();
        this.RefreshQueue();
    }

    RefreshKnightPosition(){
        if(this.params.knight.init.mode === 'center')  {
            this.knight_x = Math.floor(this.params.grid.cols / 2)
            this.knight_y = Math.floor(this.params.grid.rows / 2)
        }else if(this.params.knight.init.mode === 'random'){
            this.knight_x = Math.floor(Math.random() * this.params.grid.cols)
            this.knight_y = Math.floor(Math.random() * this.params.grid.rows)
        }else if(this.params.knight.init.mode === 'custom'){
            this.knight_x = this.params.knight.init.x;
            this.knight_y = this.params.knight.init.y;
        }else{
            this.knight_x = 0;
            this.knight_y = 0;
        }
    }

    RefreshKnightOffsets(){
        for(let i = 0; i < 4; i++){
            const muls = Array.from(i.toString(2).padStart(2,'0')).map((m) => parseInt(m));
            const x_mul = muls[0] ? -1 : 1;
            const y_mul = muls[1] ? -1 : 1;
            const x = x_mul * this.params.knight.jump.x
            const y = y_mul * this.params.knight.jump.y
            this.knight_jump_offsets.push({x:x,y:y});
            this.knight_jump_offsets.push({x:y,y:x});
        }
    }

    RefreshGrid(){

        this.cell_width = this.params.canvas.width / this.params.grid.cols;
        this.cell_height =  this.params.canvas.height / this.params.grid.rows;
        this.grid = []
        this.cell_count = 0;
        for(let i = 0; i < this.params.grid.cols; i++){
            let row: Cell[] = [];
            for(let j = 0; j < this.params.grid.rows; j++){
                let value: number;
                if(this.params.grid.random){
                    value = Math.floor(Math.random() * this.params.grid.max_value)                
                }else{
                    value = this.cell_count % this.params.grid.max_value
                }
                row.push({
                    index: this.cell_count++,
                    value: value,
                    x: i * this.cell_width,
                    y: j * this.cell_height,
                    cx: i * this.cell_width + (this.cell_width / 2),
                    cy: j * this.cell_height + (this.cell_height / 2)
                })
            }
            this.grid.push(row)
        }
        this.start_grid_sum = arrSum(this.grid.map((row)=> row.map((cell)=>cell.value)))
        if(this.params.grid.increment_max_value)
            this.params.grid.max_value += this.params.grid.max_value_step
    }

    RefreshQueue(){
        this.weave_queue = new Array(this.params.weave.queue_length).fill({x:this.knight_x,y:this.knight_y});
    }

    Jump(N:number = 1): any[]{
        let shapes: any[] = [];
        while(true){
            let jump_frame: any = {
                knight: [],
                weave: [],
            }
            // if(this.params.draw.jump_options.on)
                // this.drawOptions(options);
            if(this.params.knight.on)
                jump_frame.knight.push(this.drawKnight());
            if(this.params.weave.on)
                jump_frame.weave = this.drawWeave();
            shapes.push(jump_frame);
            const options = this.calculateNext()
            if(options.length == 0){
                shapes[shapes.length - 1].weave.push({
                    x: (this.knight_x) * this.cell_width + this.cell_width / 2,
                    y: (this.knight_y) * this.cell_height + this.cell_height / 2,
                })
                this.jump_count = 0;
                break;
            }
            let next_jump_index = this.nextJumpIndex(options);
            this.direction.x = options[next_jump_index].x - this.knight_x 
            this.direction.y = options[next_jump_index].y - this.knight_y 
            this.knight_x = options[next_jump_index].x
            this.knight_y = options[next_jump_index].y
            this.grid[this.knight_x][this.knight_y].value = -1;
            this.jump_count = this.jump_count + 1
            this.weave_queue.push({x: this.knight_x,y: this.knight_y})
            this.weave_queue.shift();
        }
        return shapes;
    }

    printWeaveQueue(){
        console.log('weave queue')
        this.weave_queue.forEach((w)=>{
            console.log('x: ',w.x,',y: ',w.y)
        })
    }

    drawKnight(): Rect{
        let rect: Rect;
        if(this.params.knight.mode === 'squares'){
            rect = {
                x:this.grid[this.knight_x][this.knight_y].x, 
                y:this.grid[this.knight_x][this.knight_y].y, 
                w:this.cell_width, 
                h:this.cell_height,
                color: '',
            }
        }
        if(this.params.knight.mode === 'bars') {
            rect = {
                x: this.grid[this.knight_x][this.knight_y].x, 
                y: this.grid[this.knight_x][this.knight_y].y, 
                w: this.cell_width, 
                h: this.cell_height * this.grid[this.knight_x][this.knight_y].y,
                color: ''
            }
        }
        let cv = arrSum(this.grid.map((row)=> row.map((cell)=>cell.value))) / this.start_grid_sum;
        // let cv = this.jump_count / this.params.color.domain;
        // let col = this.color_machine(1 - cv).rgba()
        // col[3] = this.params.jump_options.alpha * 255;
        rect.color = this.color_machine(cv, 'rgba').alpha(255 * this.params.knight.alpha).hex()
        return rect;
    }
    
    drawWeave(): any[]{
        return SmoothLine(
            this.weave_queue.map((cell_index) => {
                return{
                    x: this.grid[cell_index.x][cell_index.y].cx,
                    y: this.grid[cell_index.x][cell_index.y].cy,
                }
            }),
            this.params.weave.smooth.iter_end,
            this.params.weave.smooth.iter_start,
            this.params.weave.smooth.ratio,   
        ).map((p: any, index: number)=>{
            // let cv = arrSum(this.grid.map((row)=> row.map((cell)=>cell.value))) / this.start_grid_sum;
            let cv = (this.jump_count % this.params.color.domain) / this.params.color.domain;
            return{
                ...p,
                color: this.color_machine(1 - cv, 'rgba').alpha(255 * this.params.knight.alpha).hex()
            }
        });
    }

    drawOptions(options: any){
        // this.setOptionsColors();
        // options.map((op: any) =>{
        //     if(this.params.jump_options.shape == 'circle'){
        //         // this.graphic.circle(
        //         //     this.grid[op.x][op.y].cx, 
        //         //     this.grid[op.x][op.y].cy, 
        //         //     this.cell_width * this.params.jump_options.radius, 
        //         // )
        //     }
        //     if(this.params.jump_options.shape == 'rect'){
        //         let w = this.cell_width * this.params.jump_options.radius
        //         let h = this.cell_height * this.params.jump_options.radius
        //         // this.graphic.rect(
        //         //     this.grid[op.x][op.y].cx, 
        //         //     this.grid[op.x][op.y].cy, 
        //         //     w - w/2,
        //         //     h - h/2,
        //         // )
        //     }
        // })
    }

    nextJumpIndex(options: any){
        let next_jump_index = -1;
        let high_value = -100000;
        options.forEach((option: any,index: number)=>{
            if(option.value > high_value){
                high_value = option.value;
                next_jump_index = index;
            }
        })
        return next_jump_index;
    }

    calculateNext(){
        let options: Point[] = [];
        // console.log('knight_jump_offsets',this.knight_jump_offsets)
        this.knight_jump_offsets.forEach((offset)=>{
            try{
                const x = this.knight_x + offset.x; 
                const y = this.knight_y + offset.y; 
                const v = this.grid[x][y].value;
                options.push({
                    value: v,
                    x: x,
                    y: y
                })
            }catch{
                
            }
        })
        // console.log('options',options)
        options = options.filter((o)=>o.value != -1)
        return options
    }

}