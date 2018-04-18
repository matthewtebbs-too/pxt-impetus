/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>
/// <reference path="object.ts"/>

namespace pxsim {
    export class MaterialImpl extends rt.ProxyObjectWithId<THREE.MeshStandardMaterial> implements Material {
        public static instantiate(reference: THREE.Material) {
            return new SolidMaterial(reference);
        }

        private _density = 1;

        public get density(): number {
            return this._density;
        }

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

        protected _onDispose() {
            /* do nothing */
        }
    }

    export class SolidMaterial extends MaterialImpl {
        public static instantiate_(
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
    }
}

namespace pxsim.material {
    export function materialOfColor(color?: Color): SolidMaterial {
        return SolidMaterial.instantiate_(color);
    }

    export function emissive(material: Material, value?: Color): Color {
        if (value) {
            material.emissive = value;
        }

        return material.emissive as pxsim.Color;
    }
}
