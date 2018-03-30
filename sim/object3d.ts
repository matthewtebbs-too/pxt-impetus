/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Object3D<T extends THREE.Object3D> extends rt.WrappedObjectWithId<T> {
        constructor(reference: T, id?: rt.ObjId) {
            super(reference, id);

            this.reference.name = this.id as string;
            this.reference.userData = {...this.reference.userData, outer: this};

            if (undefined !== this.reference.castShadow) {
                this.reference.castShadow = true;
            }

            if (undefined !== this.reference.receiveShadow) {
                this.reference.receiveShadow = true;
            }
        }

        public lookAt(position: Vector)  {
            this.reference.lookAt(position);
        }

        public resize(width: number, height: number) {
            /* do nothing */
        }

        public setPosition(position: Vector) {
            this.reference.position.set(position.x, position.y, position.z);
        }

        public setRotation(rotation: Vector) {
            this.reference.rotation.set(THREE.Math.degToRad(rotation.x), THREE.Math.degToRad(rotation.y), THREE.Math.degToRad(rotation.z));
        }

        public setScale(scale: Vector) {
            this.reference.scale.set(scale.x, scale.y, scale.z);
        }

        public setRotationFromAxisAngle(axis: Vector, angle: number) {
            this.reference.setRotationFromAxisAngle(axis, THREE.Math.degToRad(angle));
        }

        public animate(timeStep: number) {
            this.reference.children.forEach(reference => {
                const outer = outerObject(reference);
                if (outer) {
                    outer.animate(timeStep);
                }
            });
        }

        public onAdded(scene: Scene) {
            /* do nothing */
        }

        public onRemoved(scene: Scene) {
            /* do nothing */
        }

        protected _onDispose() {
            this.reference.children.forEach(reference => {
                const outer = outerObject(reference);
                if (outer) {
                    outer.dispose();
                }
            });

            this.reference.userData = {...this.reference.userData, outer: null};
        }
    }

    export type GenericObject3D = Object3D<THREE.Object3D>;

    export function outerObject(reference: THREE.Object3D): GenericObject3D | null {
        return reference.userData.outer as GenericObject3D || null;
    }
}

namespace pxsim.object3d {
}
