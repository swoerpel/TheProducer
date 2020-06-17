import { Component, h, State, EventEmitter, Event } from "@stencil/core";
import { knightTrapWeaveService } from "../../../services/knight_trap_weave.service";

@Component({
    tag: 'weave-tab',
    styleUrl: 'weave-tab.scss',
    shadow: true
})

export class WeaveTab{
    

    private drawing_styles = [
        'smooth',
        'chaotic',
        'strong',
        'weak',
    ]

    private division_extrema: {low:number;high:number;} = {low: 1, high: 8};
    @State() min_width: number = 50;
    @State() max_width: number = 75;
    @State() width_divisions: number = 3;
    @State() width_change_frequency: number = 50;
    @State() drawing_style_index: number = 0;

    setDrawingStyle(event){
        this.drawing_style_index = event.target.value;
    }
    setMinWidth(event){
        this.min_width = event.target.value;
    }
    setMaxWidth(event){
        this.max_width = event.target.value;
    }
    setWidthDivisions(event){
        this.width_divisions = event.target.value;
    }
    setWidthChangeFrequency(event){
        this.width_change_frequency = event.target.value;
    }


    render(){
        return (
            <div class='container'>
                <div class='input-container'>
                    <div class="section-header">Min Width</div>
                    <div class="slider-container">
                        <input type="range" min="1" max="100" value="50" 
                               class="slider" onInput={(event) => this.setMinWidth(event)}/>
                    </div>
                    <input type="text" class='slider-value' value={this.min_width}></input>
                </div>
                <div class='input-container'>
                    <div class="section-header">Max Width</div>
                    <div class="slider-container">
                        <input type="range" min="1" max="100" value="50" 
                               class="slider" onInput={(event) => this.setMaxWidth(event)}/>
                    </div>
                    <input type="text" class='slider-value' value={this.max_width}></input>
                </div>
                <div class='input-container'>
                    <div class="section-header">Divisions</div>
                    <div class="slider-container">
                        <input type="range" min={this.division_extrema.low} max={this.division_extrema.high} value={this.division_extrema.low} 
                               class="slider" onInput={(event) => this.setWidthDivisions(event)}/>
                    </div>
                    <input type="text" class='slider-value' value={this.width_divisions}></input>
                </div>
                <div class='input-container'>
                    <div class="section-header">Frequency</div>
                    <div class="slider-container">
                        <input type="range" min="1" max="100" value="20" 
                               class="slider" onInput={(event) => this.setWidthChangeFrequency(event)}/>
                    </div>
                    <input type="text" class='slider-value' value={this.width_change_frequency}></input>
                </div>
                <div class='input-container'>
                    <div class="section-header">Drawing Style</div>
                    <div class="population-dropdown-container">
                    <select onInput={(event)=> this.setDrawingStyle(event)} id="weave-drawing-style">{
                        this.drawing_styles.map((drawing_style, index) =>
                            <option class="container option" value={index}>{drawing_style}</option>
                        )}
                    </select>
                    </div>
                </div>
            </div>
        );
    }
}

