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

    export class SolidMaterial extends Material<THREE.MeshStandardMaterial> {
        public static getInstance(
            solidColor?: Color,
            id?: rt.ObjId,
        ) {
            return SolidMaterial._factory.getInstanceNoCache(
                {
                    color: (solidColor ? solidColor.getHex() : undefined) || Palette.White,
                    emmisive: 0.,
                    metalness: 0.,
                    roughness: .5,
                },
                id);
        }

        private static _factory = new rt.ObjectWithIdFactory<SolidMaterial>(SolidMaterial);

        public get color(): Color {
            return this.reference.color;
        }

        public set color(value: Color) {
            this.reference.color = value;
        }

        public get roughness(): number {
            return this.reference.roughness;
        }

        public set roughness(value: number) {
            this.reference.roughness = value;
        }

        public get metalness(): number {
            return this.reference.metalness;
        }

        public set metalness(value: number) {
            this.reference.metalness = value;
        }

        public get emissive(): Color {
            return this.reference.emissive;
        }

        public set emissive(value: Color) {
            this.reference.emissive = value;
        }

        constructor(
            params?: any,
            id?: rt.ObjId,
        ) {
            super(new THREE.MeshStandardMaterial(params), id);
        }
    }
}

namespace pxsim.material {
    export function materialOfColor(color?: Color): SolidMaterial {
        return SolidMaterial.getInstance(color);
    }
}
