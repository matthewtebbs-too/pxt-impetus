/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object3d.ts"/>

namespace pxsim {
    export class Mesh extends Object3d<THREE.Mesh> {
        private _shape3d: GenericShape3d;
        private _material: Material;
        private _rigidbody: RigidBody | null = null;

        public get shape3d() {
            return this._shape3d;
        }

        public get material() {
            return this._material;
        }

        constructor(
            shape3d: GenericShape3d,
            material: Material,
            id?: rt.ObjId,
        ) {
            super(new THREE.Mesh(shape3d.reference, material.reference), id);

            this._shape3d = shape3d;
            this._material = material;

            this._rigidbody = new RigidBody(this, this.shape3d, this.shape3d.volume * this.material.density);
        }

        public enablePhysics(enable: boolean) {
            if (this._rigidbody) {
                this._rigidbody.setKinematicObject(!enable);
            }
        }

        public animate(timeStep: number) {
            super.animate(timeStep);

            if (this._rigidbody) {
                this._rigidbody!.syncMotionStateToObject3D();
            }
        }

        public onAdded(scene: GenericScene) {
            super.onAdded(scene);

            if (this._rigidbody) {
                this._rigidbody.addRigidBody(scene.physicsWorld);
            }
        }

        public onRemoved(scene: GenericScene) {
            if (this._rigidbody) {
                this._rigidbody.removeRigidBody(scene.physicsWorld);
            }

            super.onRemoved(scene);
        }

        protected _onDispose() {
            if (this._rigidbody) {
                this._rigidbody.dispose();
            }

            super._onDispose();
        }
    }
}

namespace pxsim.mesh {
    export function mesh(shape3d: GenericShape3d, material: Material): Mesh {
        return new Mesh(shape3d, material);
    }
}
