/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Material<T extends THREE.Material> extends rt.ProxyObjectWithId<T>  {
        public static instantiate(reference: THREE.Material) {
            return new SolidMaterial(reference);
        }

        private _density = 1;

        public get density(): number {
            return this._density;
        }

        protected _onDispose() {
            /* do nothing */
        }
    }

    export type GenericMaterial = Material<THREE.Material>;

    export class SolidMaterial extends Material<THREE.MeshStandardMaterial> {
        public static instantiateN(
            solidColor?: Color,
            id?: rt.ObjId,
        ) {
            return SolidMaterial._factory.instantiate(
                {
                    color: (solidColor ? solidColor.getHex() : undefined) || Palette.White,
                    emissive: 0.,
                    metalness: 0.,
                    roughness: .5,
                });
        }

        private static _factory = new rt.ObjectFactory<SolidMaterial>(
            parameters => new SolidMaterial(parameters),
        );

        public get color(): Color {
            return this.reference.color;
        }

        public set color(value: Color) {
            this.reference.color = value;
        }

        public get emissive(): Color {
            return this.reference.emissive;
        }

        public set emissive(value: Color) {
            this.reference.emissive = value;
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

        constructor(parameters?: any) {
            super(new THREE.MeshStandardMaterial(parameters));
        }
    }
}

namespace pxsim.material {
    export function materialOfColor(color?: Color): SolidMaterial {
        return SolidMaterial.instantiateN(color);
    }
}
