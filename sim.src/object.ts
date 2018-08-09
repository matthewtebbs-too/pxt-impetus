/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

import * as Helper from './_helper';
import { RigidBody } from './_rigidbody';
import * as RT from './_runtime';
import { Quaternion, Vector, VectorConstructor } from './math';
import { Scene3d } from './scene';

// tslint:disable-next-line:interface-name
export interface IObject3dPose {
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
}

export function Object3dMixin<T extends RT.ObjectConstructor<THREE.Object3D>>(base: T) {
    return class extends base implements IObject3dPose, RT.IDisposableObject, RT.ICloneableObject {
        protected _rigidbody: RigidBody | null = null;

        private _isDisposed = false;

        constructor(...args: any[]) {
            super(...args);

            if (undefined !== this.castShadow) {
                this.castShadow = true;
            }

            if (undefined !== this.receiveShadow) {
                this.receiveShadow = true;
            }
        }

        public get position_(): Vector {
            return this.position;
        }

        public set position_(position: Vector) {
            this.position.copy(position);
        }

        public get rotation_(): Vector {
            const rotation = this.rotation.toVector3();
            return new VectorConstructor(THREE.Math.radToDeg(rotation.x), THREE.Math.radToDeg(rotation.y), THREE.Math.radToDeg(rotation.z));
        }

        public set rotation_(rotation: Vector) {
            this.rotation.setFromVector3(new VectorConstructor(THREE.Math.degToRad(rotation.x), THREE.Math.degToRad(rotation.y), THREE.Math.degToRad(rotation.z)));
        }

        public get quaternion_(): Quaternion {
            return this.quaternion;
        }

        public set quaternion_(quaternion: Quaternion) {
            this.quaternion.copy(quaternion);
        }

        public get scale_(): Vector {
            return this.scale;
        }

        public set scale_(scale: Vector) {
            this.scale.copy(scale);
        }

        public setRotationFromAxisAngle(axis: Vector, angle: number) {
            if (!axis) {
                return;
            }

            super.setRotationFromAxisAngle(axis, THREE.Math.degToRad(angle));
        }

        public setPhysicsEnabled(enable: boolean) {
            if (this._rigidbody) {
                this._rigidbody.setIsKinematic(!enable, this);

                this.matrixAutoUpdate = this._rigidbody.isKinematic;
            }

            this.children.forEach(child => (child as Object3d).setPhysicsEnabled(enable));
        }

        public lookAtPosition(position: Vector) {
            if (!position) {
                return;
            }

            this.lookAt(position);
        }

        public animate(timeStep: number) {
            if (this._rigidbody) {
                if (this._rigidbody.syncMotionStateToObject3d(this)) {
                    this.updateMatrix();
                }
            }

            this.children.forEach(child => (child as Object3d).animate(timeStep));
        }

        public onAdded(scene3d: Scene3d) {
            if (this._rigidbody) {
                this._rigidbody.addRigidBody(scene3d.physicsWorld, this);
            }

            this.children.forEach(child => (child as Object3d).onAdded(scene3d));
        }

        public onRemoved(scene3d: Scene3d) {
            this.children.forEach(child => (child as Object3d).onRemoved(scene3d));

            if (this._rigidbody) {
                this._rigidbody.removeRigidBody(scene3d.physicsWorld);
            }
        }

        public copy(source: this, recursive?: boolean): this {
            super.copy(source, recursive);

            throw Error();
        }

        public dispose() {
            if (!this._isDisposed) {
                this._onDispose();
                this._isDisposed = true;
            }
        }

        protected _onDispose() {
            this.children.forEach(child => (child as Object3d).dispose());

            Helper.safeObjectDispose(this._rigidbody);
            this._rigidbody = null;
        }
    };
}

export class Object3d extends Object3dMixin(THREE.Object3D) { }

namespace pxsimImpetus.object {
}
