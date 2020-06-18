import { Component, h } from "@stencil/core";

@Component({
    tag: 'draw-tab',
    styleUrl: 'draw-tab.scss',
    shadow: true
})

export class DrawTab{

    render(){
        return (
            <div class='container'>
                <slider-input title={'S1'} ></slider-input>
                <slider-input title={'S2'} ></slider-input>
                <slider-input title={'S3'} ></slider-input>
            </div>
        );
    }
}

