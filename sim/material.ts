/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Material<T extends THREE.Material> extends rt.WrappedObjectWithId<T>  {
        private _density = 1;

        public get density(): number {
            return this._density;
        }

        protected _onDispose() {
            /* do nothing */
        }
    }

    export class GenericMaterial extends Material<THREE.Material> { }

    export class SolidMaterial extends Material<THREE.MeshPhongMaterial> {
        public static getInstance(
            solidColor?: Color,
            id?: rt.ObjId,
        ) {
            return this._factory.getInstance(
                { color: (solidColor ? solidColor.getHex() : undefined) || Palette.White },
                id);
        }

        private static _factory = new rt.ObjectWithIdFactory<SolidMaterial>(SolidMaterial);

        constructor(
            params?: any,
            id?: rt.ObjId,
        ) {
            super(new THREE.MeshPhongMaterial(params), id);
        }
    }
}

namespace pxsim.material {
    export function materialOfColor(color?: Color): SolidMaterial {
        return SolidMaterial.getInstance(color);
    }
}
