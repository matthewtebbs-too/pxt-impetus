/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object.ts"/>

namespace pxsim {
    export class LightImpl<T extends THREE.Light> extends Object3dImpl<T> implements Light {
        public static distFrustum = 100;

        protected _configureShadow() {
            (this.reference.shadow.camera as THREE.OrthographicCamera).left = -LightImpl.distFrustum;
            (this.reference.shadow.camera as THREE.OrthographicCamera).right = LightImpl.distFrustum;
            (this.reference.shadow.camera as THREE.OrthographicCamera).top = LightImpl.distFrustum;
            (this.reference.shadow.camera as THREE.OrthographicCamera).bottom = -LightImpl.distFrustum;

            this.reference.shadow.bias = 0.0001;
            this.reference.shadow.mapSize.width = 2048;
            this.reference.shadow.mapSize.height = 2048;
        }
    }

    export class AmbientLight extends LightImpl<THREE.AmbientLight> {
        constructor(color?: Color, intensity?: number) {
            super(new THREE.AmbientLight(color || Palette.SoftWhite, intensity || 1));
        }
    }

    export class DirectionalLight extends LightImpl<THREE.DirectionalLight> {
        constructor(color?: Color, intensity?: number) {
            super(new THREE.DirectionalLight(color || Palette.White, intensity || 1));

            this._configureShadow();
        }
    }

    export class HemisphereLight extends LightImpl<THREE.HemisphereLight> {
        constructor(colorSky?: Color, colorGround?: Color, intensity?: number) {
            super(new THREE.HemisphereLight(colorSky || NaturePalette.Sky, colorGround || NaturePalette.Ground, intensity || 0.6));
        }
    }

    export class PointLight extends LightImpl<THREE.PointLight> {
        constructor(
            color?: Color, intensity?: number,
            distance?: number,
            decay?: number,
        ) {
            super(new THREE.PointLight(color || Palette.White, intensity || 1, distance || 0, decay || 2));

            this._configureShadow();
        }
    }

    export class SpotLight extends LightImpl<THREE.SpotLight> {
        constructor(
            color?: Color, intensity?: number,
            distance?: number, angle?: number,
            penumbra?: number, decay?: number,
        ) {
            super(
                new THREE.SpotLight
                (
                    color || Palette.White, intensity || 1,
                    distance || 0, angle || Math.PI / 3,
                    penumbra || 0, decay || 2,
                ),
            );

            this._configureShadow();
        }
    }
}

namespace pxsim.light {
    export function ambientLight(color?: Color, intensity?: number): DirectionalLight  {
        return new DirectionalLight(color, intensity);
    }

    export function directionalLight(color?: Color, intensity?: number): DirectionalLight  {
        return new DirectionalLight(color, intensity);
    }

    export function hemisphereLight(colorSky?: Color, colorGround?: Color, intensity?: number): HemisphereLight  {
        return new HemisphereLight(colorSky, colorGround, intensity);
    }
}
