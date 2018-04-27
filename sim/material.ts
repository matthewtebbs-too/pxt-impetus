/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../shared/enums.ts"/>

/// <reference path="_runtime.ts"/>

namespace pxsim {
    // tslint:disable-next-line:interface-name
    export interface MaterialParameters extends THREE.MeshStandardMaterialParameters {
    }

    export function MaterialMixin<T extends rt.ObjectConstructor<THREE.MeshStandardMaterial>>(base: T) {
        return class extends base implements rt.ICloneableObject {
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

    export class SolidMaterial extends Material {
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
}
