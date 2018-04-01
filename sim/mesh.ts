/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object3d.ts"/>

namespace pxsim {
    export class Mesh extends Object3d<THREE.Mesh> {
        private _shape3d: GenericShape3d;
        private _material: GenericMaterial;

        public get shape3d() {
            return this._shape3d;
        }

        public get material() {
            return this._material;
        }

        constructor(
            shape3d: GenericShape3d,
            material: GenericMaterial,
            id?: rt.ObjId,
        ) {
            super(new THREE.Mesh(shape3d.reference, material.reference), id);

            this._shape3d = shape3d;
            this._material = material;

            this._rigidbody = new RigidBody(this, this.shape3d, this.shape3d.volume * this.material.density);
        }
    }
}

namespace pxsim.mesh {
    export function from3dShape(shape3d: GenericShape3d, material: GenericMaterial): Mesh {
        return new Mesh(shape3d, material);
    }
}
