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
    interface ColorPaletteList {
    }
    interface PortraitImage {
        "simulation_params": any;
    }
    interface PortraitSettings {
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
    interface HTMLColorPaletteListElement extends Components.ColorPaletteList, HTMLStencilElement {
    }
    var HTMLColorPaletteListElement: {
        prototype: HTMLColorPaletteListElement;
        new (): HTMLColorPaletteListElement;
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
    interface HTMLElementTagNameMap {
        "app-portrait": HTMLAppPortraitElement;
        "app-root": HTMLAppRootElement;
        "color-palette-list": HTMLColorPaletteListElement;
        "portrait-image": HTMLPortraitImageElement;
        "portrait-settings": HTMLPortraitSettingsElement;
    }
}
declare namespace LocalJSX {
    interface AppPortrait {
    }
    interface AppRoot {
    }
    interface ColorPaletteList {
        "onOn_palette_select"?: (event: CustomEvent<string>) => void;
    }
    interface PortraitImage {
        "simulation_params"?: any;
    }
    interface PortraitSettings {
        "onOn_color_list_toggle"?: (event: CustomEvent<any>) => void;
        "onRefresh_params"?: (event: CustomEvent<Object>) => void;
    }
    interface IntrinsicElements {
        "app-portrait": AppPortrait;
        "app-root": AppRoot;
        "color-palette-list": ColorPaletteList;
        "portrait-image": PortraitImage;
        "portrait-settings": PortraitSettings;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-portrait": LocalJSX.AppPortrait & JSXBase.HTMLAttributes<HTMLAppPortraitElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "color-palette-list": LocalJSX.ColorPaletteList & JSXBase.HTMLAttributes<HTMLColorPaletteListElement>;
            "portrait-image": LocalJSX.PortraitImage & JSXBase.HTMLAttributes<HTMLPortraitImageElement>;
            "portrait-settings": LocalJSX.PortraitSettings & JSXBase.HTMLAttributes<HTMLPortraitSettingsElement>;
        }
    }
}
