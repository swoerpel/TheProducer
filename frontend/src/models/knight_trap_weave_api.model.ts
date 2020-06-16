
export interface KnightTrapWeaveApiParams{
    trap_count: number;
    canvas: KTWCanvasParams;
    grid: KTWGridParams;
    weave: KTWWeaveParams;
    knight: KTWKnightParams;
    color: KTWColorParams;
}

export interface KTWCanvasParams {
    width: number; // hardcoded
    height: number; // hardcoded
}

export interface KTWGridParams{
    cols: number; // user input
    rows: number; // user input

    // four below, use predefined settings templates
    max_value: number;
    max_value_step: number;
    increment_max_value: boolean; //deprecated
    random: boolean;              //deprecated
}

export interface KTWWeaveParams{
    // all "on" flags should be in the same param group
    on: boolean; // flag
    alpha: number; // misplaced
    queue_length: number; // complicated user input
    smooth: {
        iter_start: number; // hardcoded
        iter_end: number; // hardcoded
        ratio: number; // advanced user input
    }
    width: {
        dynamic: boolean; // flag
        init: number; // hardcoded
        min: number; // user input
        max: number; // user input
        step: number; // calculated user input
        oss_freq: number; // advanced user input
    }
    border: {
        on: boolean; // flag
        width: number; // user input
        color: string; // user input
    }
}

export interface KTWKnightParams{
    on: boolean; // flag
    mode: string; // user input, poor name
    alpha: number; // poor location,
    init:{
        mode: string; // important user input
        x: number; // optional input based on mode
        y: number; // optional input based on mode
    },
    jump:{
        x: number; // advanced user input
        y: number; // advanced user input
    },
    border:{
        on: boolean; // flag
        width: number; // possibly hardcoded
        color: string; // black or white -> opposite of background
        alpha: number // unnecessary
    }
}

export interface KTWColorParams {
    domain: number; // important, difficult to explain, user input
    palette: string; // user input
    background: string; // user input
}