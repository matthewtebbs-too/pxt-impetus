/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class Color extends THREE.Color {
    }
}

namespace pxsim.color {
    export function standardColor(rgb: number): Color {
        return new Color(rgb);
    }

    export function randomColor(): Color {
        return new Color(Math.random() * (1 << 24));
    }

    export function colorFromRgb(red: number, green: number, blue: number): Color {
        return new Color(red / 255, green / 255, blue / 255);
    }

    export function colorFromHsv(hue: number, sat: number, val: number): Color {
        return new Color().setHSL(hue / 255, sat / 255, val / 255);
    }

    export function colorWheel(color: number): Color {
        return new Color(color);
    }

    export function colorPicker(color: number): Color {
        return new Color(color);
    }
}
