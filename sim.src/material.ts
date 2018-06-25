/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

/// <reference types='../shared/impetus.enums'/>

import * as RT from './_runtime';
import { Color } from './color';

// tslint:disable-next-line:interface-name
export interface MaterialParameters extends THREE.MeshStandardMaterialParameters {
}

export function MaterialMixin<T extends RT.ObjectConstructor<THREE.MeshStandardMaterial>>(base: T) {
    return class extends base implements RT.ICloneableObject, RT.IDisposableObject {
        private _density: number = 1;

        public get density(): number {
            return this._density;
        }

        public set density(density: number) {
            this._density = density;
        }

        constructor(...args: any[]) {
            super(...args);
        }

        public copy(source: this): this {
            super.copy(source);

            this.density = source.density;
            return this;
        }
    };
}

export class Material extends MaterialMixin(THREE.MeshStandardMaterial) { }

namespace pxsimImpetus.material {
    export function materialOfColor(color?: Color): Material {
        return new Material(
            {
                color: (color ? color.getHex() : undefined) || Palette.White,
                emissive: 0.,
                metalness: 0.,
                roughness: .5,
            });
    }
}
