/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    interface IUserDataObject3d {
        _rigidbody: RigidBody | null;
    }

    export class Object3dImpl<T extends THREE.Object3D> extends rt.ProxyObjectWithId<T> implements Object3d {
        public static instantiate(reference: THREE.Object3D) {
            return new Object3dImpl(reference);
        }

        protected static _applyFnToUserData(reference: THREE.Object3D, fn: (udo3d: IUserDataObject3d) => void) {
            reference.children.forEach(childreference => Object3dImpl._applyFnToUserData(childreference, fn));

            const udo3d = Helper.getUserData<IUserDataObject3d>(reference, Object3dImpl._propertyUserData);
            if (udo3d) {
                fn(udo3d);
            }
        }

        private static _propertyUserData = 'udo3d';

        protected get _rigidbody(): RigidBody | null {
            const udo3d = Helper.getUserData<IUserDataObject3d>(this.reference, Object3dImpl._propertyUserData);
            return udo3d ? udo3d._rigidbody : null;
        }

        protected set _rigidbody(rigidbody: RigidBody | null) {
            const udo3d = Helper.getUserData<IUserDataObject3d>(this.reference, Object3dImpl._propertyUserData);
            if (udo3d) {
                udo3d._rigidbody = rigidbody;
            }
        }

        constructor(reference: T) {
            super(reference);

            // tslint:disable-next-line:no-string-literal
            this.reference.userData[Object3dImpl._propertyUserData] = {
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
            Object3dImpl._applyFnToUserData(this.reference, udo3d => {
                if (udo3d._rigidbody) {
                    udo3d._rigidbody.syncMotionStateToObject3d();
                }
            });
        }

        public onAdded(scene3d: Scene3dImpl) {
            if (this._rigidbody) {
                this._rigidbody.addRigidBody(scene3d.physicsWorld);
            }
        }

        public onRemoved(scene3d: Scene3dImpl) {
            if (this._rigidbody) {
                this._rigidbody.removeRigidBody(scene3d.physicsWorld);
            }
        }

        protected _constructRigidBody(): RigidBody | null {
            return null;
        }

        protected _onDispose() {
            Object3dImpl._applyFnToUserData(this.reference, udo3d => {
                if (udo3d._rigidbody) {
                    udo3d._rigidbody.dispose();
                }
            });

            delete this.reference.userData.udo3d;
        }
    }
}

namespace pxsim.object {
}
