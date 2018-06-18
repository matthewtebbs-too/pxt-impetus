/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

export type Color = THREE.Color;

// tslint:disable-next-line:variable-name
export const ColorConstructor = THREE.Color;

export namespace pxsimImpetus.color {
    export function colorToString(color: Color): string {
        return `(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`;
    }

    export function standardColor(rgb: number): Color {
        return new ColorConstructor(rgb);
    }

    export function randomColor(): Color {
        return new ColorConstructor(Math.random() * (1 << 24));
    }

    export function colorFromRgb(red: number, green: number, blue: number): Color {
        return new ColorConstructor().setRGB(red / 255, green / 255, blue / 255);
    }

    export function colorFromHsv(hue: number, sat: number, val: number): Color {
        return new ColorConstructor().setHSL(hue / 255, sat / 255, val / 255);
    }

    export function colorWheel(color: number): Color {
        return new ColorConstructor(color);
    }

    export function colorPicker(color: number): Color {
        return new ColorConstructor(color);
    }
}
