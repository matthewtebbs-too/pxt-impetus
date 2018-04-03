/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export abstract class Object3d<T extends THREE.Object3D> extends rt.WrappedObjectWithId<T> {
        protected _rigidbody: RigidBody | null = null;

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
            if (!position) {
                return;
            }

            this.reference.lookAt(position);
        }

        public setPosition(position: Vector) {
            if (!position) {
                return;
            }

            this.reference.position.set(position.x, position.y, position.z);
        }

        public setRotation(rotation: Vector) {
            if (!rotation) {
                return;
            }

            this.reference.rotation.set(THREE.Math.degToRad(rotation.x), THREE.Math.degToRad(rotation.y), THREE.Math.degToRad(rotation.z));
        }

        public setScale(scale: Vector) {
            this.reference.scale.set(scale.x, scale.y, scale.z);
        }

        public setRotationFromAxisAngle(axis: Vector, angle: number) {
            if (!axis) {
                return;
            }

            this.reference.setRotationFromAxisAngle(axis, THREE.Math.degToRad(angle));
        }

        public setPhysicsEnabled(enable: boolean) {
            if (this._rigidbody) {
                this._rigidbody.isKinematic = !enable;
            }
        }

        public animate(timeStep: number) {
            this.reference.children.forEach(reference => {
                const outer = outerObject(reference);
                if (outer) {
                    outer.animate(timeStep);
                }
            });

            if (this._rigidbody) {
                this._rigidbody!.syncMotionStateToObject3d();
            }
        }

        public onAdded(scene3d: GenericScene3d) {
            if (this._rigidbody) {
                this._rigidbody.addRigidBody(scene3d.physicsWorld);
            }
        }

        public onRemoved(scene3d: GenericScene3d) {
            if (this._rigidbody) {
                this._rigidbody.removeRigidBody(scene3d.physicsWorld);
            }
        }

        protected _constructRigidBody(): RigidBody | null {
            return null;
        }

        protected _onDispose() {
            this.reference.children.forEach(reference => {
                const outer = outerObject(reference);
                if (outer) {
                    outer.dispose();
                }
            });

            if (this._rigidbody) {
                this._rigidbody.dispose();
            }

            this.reference.userData = {...this.reference.userData, outer: null};
        }
    }

    export class GenericObject3d extends Object3d<THREE.Object3D> { }

    export function outerObject(reference: THREE.Object3D): GenericObject3d | null {
        return reference.userData.outer as GenericObject3d || null;
    }
}

namespace pxsim.object {
}
