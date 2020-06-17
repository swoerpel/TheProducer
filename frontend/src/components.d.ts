/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppPortrait {
    }
    interface AppRoot {
    }
    interface ColorPaletteInput {
    }
    interface GridSizeInput {
    }
    interface GridTab {
    }
    interface PortraitImage {
        "simulation_params": any;
    }
    interface PortraitSettings {
    }
    interface WeaveInput {
    }
}
declare global {
    interface HTMLAppPortraitElement extends Components.AppPortrait, HTMLStencilElement {
    }
    var HTMLAppPortraitElement: {
        prototype: HTMLAppPortraitElement;
        new (): HTMLAppPortraitElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLColorPaletteInputElement extends Components.ColorPaletteInput, HTMLStencilElement {
    }
    var HTMLColorPaletteInputElement: {
        prototype: HTMLColorPaletteInputElement;
        new (): HTMLColorPaletteInputElement;
    };
    interface HTMLGridSizeInputElement extends Components.GridSizeInput, HTMLStencilElement {
    }
    var HTMLGridSizeInputElement: {
        prototype: HTMLGridSizeInputElement;
        new (): HTMLGridSizeInputElement;
    };
    interface HTMLGridTabElement extends Components.GridTab, HTMLStencilElement {
    }
    var HTMLGridTabElement: {
        prototype: HTMLGridTabElement;
        new (): HTMLGridTabElement;
    };
    interface HTMLPortraitImageElement extends Components.PortraitImage, HTMLStencilElement {
    }
    var HTMLPortraitImageElement: {
        prototype: HTMLPortraitImageElement;
        new (): HTMLPortraitImageElement;
    };
    interface HTMLPortraitSettingsElement extends Components.PortraitSettings, HTMLStencilElement {
    }
    var HTMLPortraitSettingsElement: {
        prototype: HTMLPortraitSettingsElement;
        new (): HTMLPortraitSettingsElement;
    };
    interface HTMLWeaveInputElement extends Components.WeaveInput, HTMLStencilElement {
    }
    var HTMLWeaveInputElement: {
        prototype: HTMLWeaveInputElement;
        new (): HTMLWeaveInputElement;
    };
    interface HTMLElementTagNameMap {
        "app-portrait": HTMLAppPortraitElement;
        "app-root": HTMLAppRootElement;
        "color-palette-input": HTMLColorPaletteInputElement;
        "grid-size-input": HTMLGridSizeInputElement;
        "grid-tab": HTMLGridTabElement;
        "portrait-image": HTMLPortraitImageElement;
        "portrait-settings": HTMLPortraitSettingsElement;
        "weave-input": HTMLWeaveInputElement;
    }
}
declare namespace LocalJSX {
    interface AppPortrait {
    }
    interface AppRoot {
    }
    interface ColorPaletteInput {
        "onOn_palette_select"?: (event: CustomEvent<string>) => void;
    }
    interface GridSizeInput {
        "onOn_grid_size_select"?: (event: CustomEvent<number>) => void;
    }
    interface GridTab {
        "onOn_grid_size_select"?: (event: CustomEvent<number>) => void;
    }
    interface PortraitImage {
        "simulation_params"?: any;
    }
    interface PortraitSettings {
        "onOn_color_list_toggle"?: (event: CustomEvent<any>) => void;
        "onRefresh_params"?: (event: CustomEvent<Object>) => void;
    }
    interface WeaveInput {
        "onOn_weave_input_change"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "app-portrait": AppPortrait;
        "app-root": AppRoot;
        "color-palette-input": ColorPaletteInput;
        "grid-size-input": GridSizeInput;
        "grid-tab": GridTab;
        "portrait-image": PortraitImage;
        "portrait-settings": PortraitSettings;
        "weave-input": WeaveInput;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-portrait": LocalJSX.AppPortrait & JSXBase.HTMLAttributes<HTMLAppPortraitElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "color-palette-input": LocalJSX.ColorPaletteInput & JSXBase.HTMLAttributes<HTMLColorPaletteInputElement>;
            "grid-size-input": LocalJSX.GridSizeInput & JSXBase.HTMLAttributes<HTMLGridSizeInputElement>;
            "grid-tab": LocalJSX.GridTab & JSXBase.HTMLAttributes<HTMLGridTabElement>;
            "portrait-image": LocalJSX.PortraitImage & JSXBase.HTMLAttributes<HTMLPortraitImageElement>;
            "portrait-settings": LocalJSX.PortraitSettings & JSXBase.HTMLAttributes<HTMLPortraitSettingsElement>;
            "weave-input": LocalJSX.WeaveInput & JSXBase.HTMLAttributes<HTMLWeaveInputElement>;
        }
    }
}
