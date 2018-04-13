/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object.ts'/>

namespace pxsim {
    export class Mesh3d extends Object3d<THREE.Mesh> {
        public get shape3d(): GenericShape3d {
            return new GenericShape3d(this.reference.geometry);
        }

        public get material(): GenericMaterial[] | GenericMaterial {
            return Helper.applyFn(this.reference.material, ref => new GenericMaterial(ref));
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
    export function fromShapeAndMaterial(shape3d: GenericShape3d, material: GenericMaterial): Mesh3d | null {
        if (!shape3d || !material) {
            return null;
        }

        return new Mesh3d(shape3d, material);
    }

    export function materialFrom(object3d: GenericObject3d): GenericMaterial | null {
        if (!object3d || !(object3d instanceof Mesh3d)) {
            return null;
        }

        const material = (object3d as Mesh3d).material;
        return Array.isArray(material) ? (material.length > 0 ? material[0] : null) : material;
    }
}
