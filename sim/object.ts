/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    interface IUserDataObject3d {
        _rigidbody: RigidBody | null;
    }

    export abstract class Object3d<T extends THREE.Object3D> extends rt.ProxyObjectWithId<T> {
        public static instantiate(reference: THREE.Object3D) {
            return new GenericObject3d(reference);
        }

        protected static _applyFnToUserData(reference: THREE.Object3D, fn: (udo3d: IUserDataObject3d) => void) {
            reference.children.forEach(childreference => Object3d._applyFnToUserData(childreference, fn));

            const udo3d = Object3d.userData(reference);
            if (udo3d) {
                fn(udo3d);
            }
        }

        private static _propertyUserData = 'udo3d';

        private static userData(reference: THREE.Object3D): IUserDataObject3d | null {
            return reference.userData.udo3d as IUserDataObject3d || null;
        }

        protected get _rigidbody(): RigidBody | null {
            const udo3d = Object3d.userData(this.reference);
            return udo3d ? udo3d._rigidbody : null;
        }

        protected set _rigidbody(rigidbody: RigidBody | null) {
            const udo3d = Object3d.userData(this.reference);
            if (udo3d) {
                udo3d._rigidbody = rigidbody;
            }
        }

        constructor(reference: T) {
            super(reference);

            // tslint:disable-next-line:no-string-literal
            this.reference.userData[Object3d._propertyUserData] = {
                rigidbody: null,
            };

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
            Object3d._applyFnToUserData(this.reference, udo3d => {
                if (udo3d._rigidbody) {
                    udo3d._rigidbody.syncMotionStateToObject3d();
                }
            });
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
            Object3d._applyFnToUserData(this.reference, udo3d => {
                if (udo3d._rigidbody) {
                    udo3d._rigidbody.dispose();
                }
            });

            delete this.reference.userData.udo3d;
        }
    }

    export class GenericObject3d extends Object3d<THREE.Object3D> {
    }
}

namespace pxsim.object {
}
