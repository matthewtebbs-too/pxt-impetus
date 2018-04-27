/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object.ts"/>

namespace pxsim {
    export class Mesh3d extends Object3dMixin(THREE.Mesh) {
        constructor(
            shape3d: Shape3d,
            material: Material,
        ) {
            super(shape3d, material);

            this._rigidbody = new RigidBody(this, shape3d, shape3d.volume * material.density);
        }
    }
}

namespace pxsim.mesh {
    export function fromShapeAndMaterial(
        shape3d: Shape3d,
        material: Material,
    ): Mesh3d | null {
        if (!shape3d || !material) {
            return null;
        }

        return new Mesh3d(shape3d, material);
    }

    export function materialOf(object3d: Object3d): Material | null {
        if (!object3d || !(object3d instanceof Mesh3d)) {
            return null;
        }

        const material = (object3d as Mesh3d).material as (Material[] | Material);
        return Array.isArray(material) ? (material.length > 0 ? material[0] : null) : material;
    }
}
