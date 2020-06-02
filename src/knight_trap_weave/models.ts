export interface Point{
    x: number;
    y: number;
    value?: number;
}

export interface Rect{
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
}

export interface Cell{
    index: number;
    value: number;
    x:number;
    y:number;
    cx:number;
    cy:number;
}


export interface RingParams{
    index:number;
    origin:{x:number;y:number;},
    radius:number;
    draw:boolean;
    stroke_weight:number;
    points:Point[];
    max_value:number;
}