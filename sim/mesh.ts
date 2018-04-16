/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object.ts'/>

namespace pxsim {
    export class Mesh3dImpl extends Object3dImpl<THREE.Mesh> implements Mesh3d {
        public get shape3d(): Shape3d {
            return Shape3dImpl.instantiate(this.reference.geometry);
        }

        public get material(): Material[] | Material {
            return Helper.applyFn(this.reference.material, ref => MaterialImpl.instantiate(ref));
        }

        constructor(
            shape3d: Shape3dImpl<THREE.Geometry | THREE.BufferGeometry>,
            material: MaterialImpl,
        ) {
            super(new THREE.Mesh(shape3d.reference, material.reference));

            this._rigidbody = new RigidBody(this, shape3d, shape3d.volume * material.density);
        }
    }
}

namespace pxsim.mesh {
    export function fromShapeAndMaterial(
        shape3d: Shape3dImpl<THREE.Geometry | THREE.BufferGeometry>,
        material: MaterialImpl,
    ): Mesh3d | null {
        if (!shape3d || !material) {
            return null;
        }

        return new Mesh3dImpl(shape3d, material);
    }

    export function materialOf(object3d: Object3dImpl<THREE.Object3D>): Material | null {
        if (!object3d || !(object3d instanceof Mesh3dImpl)) {
            return null;
        }

        const material = (object3d as Mesh3dImpl).material;
        return Array.isArray(material) ? (material.length > 0 ? material[0] : null) : material;
    }
}
