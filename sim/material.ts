/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>
/// <reference path="object.ts"/>

namespace pxsim {
    export class MaterialImpl extends THREE.MeshStandardMaterial implements Material, rt.ICloneableObject {
        private _density = 1;

        public get density(): number {
            return this._density;
        }

        public set density(density: number) {
            this._density = density;
        }

        public copy(source: this): this {
            super.copy(source);

            this.density = source.density;
            return this;
        }
    }

    export class SolidMaterial extends MaterialImpl {
        public static instantiate(solidColor?: Color) {
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
        return SolidMaterial.instantiate(color);
    }

    export function emissive(material: Material, value?: Color): Color {
        if (value) {
            material.emissive = value;
        }
        return material.emissive as Color;
    }
}
