/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object3d.ts"/>

namespace pxsim {
    export class Mesh extends Object3D<THREE.Mesh> {
        private _geometry: GenericGeometry;
        private _material: Material;
        private _rigidbody: RigidBody | null = null;

        public get geometry() {
            return this._geometry;
        }

        public get material() {
            return this._material;
        }

        constructor(
            geometry: GenericGeometry,
            material: Material,
            id?: rt.ObjId,
        ) {
            super(new THREE.Mesh(geometry.reference, material.reference), id);

            this._geometry = geometry;
            this._material = material;

            this._rigidbody = new RigidBody(this, this.geometry, this.geometry.volume * this.material.density);
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

        public onAdded(scene: Scene) {
            super.onAdded(scene);

            if (this._rigidbody) {
                this._rigidbody.addRigidBody(scene.physicsWorld);
            }
        }

        public onRemoved(scene: Scene) {
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

    export function isMesh(object: Mesh | any): object is Mesh {
        return undefined !== (object as Mesh).geometry;
    }
}

namespace pxsim.mesh {
    export function mesh(geometry: GenericGeometry, material: Material): Mesh {
        return new Mesh(geometry, material);
    }
}
