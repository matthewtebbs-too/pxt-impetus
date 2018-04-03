/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object3d.ts"/>

namespace pxsim {
    export class Mesh extends Object3d<THREE.Mesh> {
        public get shape3d(): GenericShape3d {
            return new GenericShape3d(this.reference.geometry);
        }

        public get material(): GenericMaterial[] | GenericMaterial {
            return Array.isArray(this.reference.material) ?
                this.reference.material.map(ref => new GenericMaterial(ref)) :
                new GenericMaterial(this.reference.material);
        }

        constructor(
            shape3d: GenericShape3d,
            material: GenericMaterial,
            id?: rt.ObjId,
        ) {
            super(new THREE.Mesh(shape3d.reference, material.reference), id);

            this._rigidbody = new RigidBody(this, shape3d, shape3d.volume * material.density);
        }
    }
}

namespace pxsim.mesh {
    export function from3dShape(shape3d: GenericShape3d, material: GenericMaterial): Mesh {
        return new Mesh(shape3d, material);
    }
}
