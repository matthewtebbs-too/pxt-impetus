/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class Material extends rt.WrappedObjectWithId<THREE.Material>  {
        private _density = 1;

        public get density(): number {
            return this._density;
        }

        constructor(
            solidColor?: Color,
            id?: rt.ObjId) {
            super(new THREE.MeshPhongMaterial({ color: solidColor || Palette.white }), id);
        }

        protected _onDispose() {
            /* do nothing */
        }
    }
}

namespace pxsim.material {
    export function ofColor(color?: Color): Material {
        return new Material(color);
    }
}
