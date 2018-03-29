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

        public get rigidbody(): RigidBody | null {
            return this._rigidbody;
        }

        public get isRigidBody(): boolean {
            return !!this._rigidbody;
        }

        public set isRigidBody(yes: boolean) {
            if (yes !== this.isRigidBody) {
                if (yes) {
                    this._addRigidBody();
                } else {
                    this._removeRigidBody();
                }
            }
        }

        constructor(
            geometry: GenericGeometry,
            material: Material,
            id?: rt.ObjId,
        ) {
            super(new THREE.Mesh(geometry.reference, material.reference), id);

            this._geometry = geometry;
            this._material = material;
        }

        public animate(timeStep: number) {
            super.animate(timeStep);

            if (this.rigidbody) {
                this.rigidbody!.syncMotionStateToObject3D(this);
            }
        }

        protected _onDispose() {
            this._removeRigidBody();

            super._onDispose();
        }

        protected _addRigidBody() {
            this._removeRigidBody();

            this._rigidbody = new RigidBody(this, this.geometry, this.geometry.volume * this.material.density);
        }

        protected _removeRigidBody() {
            if (this.rigidbody) {
                this.rigidbody.dispose();
            }

            this._rigidbody = null;
        }
    }

    export function isMesh(object: Mesh | any): object is Mesh {
        return undefined !== (object as Mesh).rigidbody;
    }
}

namespace pxsim.mesh {
    export function mesh(geometry: GenericGeometry, material: Material): Mesh {
        return new Mesh(geometry, material);
    }
}
