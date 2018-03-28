/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="object3d.ts"/>

namespace pxsim {
    export class Mesh extends Object3D<THREE.Mesh> {
        public static minMass = 0;
        public static maxMass = 100;

        private _geometry: GenericGeometry;
        private _material: Material;

        private _btshape: Ammo.btCollisionShape | null = null;
        private _btmotionstate: Ammo.btMotionState | null = null;
        private _btinfo: Ammo.btRigidBodyConstructionInfo | null = null;
        private _btbody: Ammo.btRigidBody | null = null;

        public get isRigidBody(): boolean {
            return !!this._btbody;
        }

        public set isRigidBody(yes: boolean) {
            if (yes !== this.isRigidBody) {
                if (yes) {
                    this._configureRigidBody();
                } else {
                    this._removeRigidBody();
                }
            }
        }

        public get rigidbody(): Ammo.btRigidBody | null {
            return this._btbody;
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

            this._syncFromMotionState();
        }

        protected _onDispose() {
            if (this.isRigidBody) {
                this._removeRigidBody();
            }

            super._onDispose();
        }

        protected _getMotionState(btmotionstate: Ammo.btMotionState) {
            const bttransform = new Ammo.btTransform();
            let btorigin, btquarternion;

            bttransform.setOrigin(btorigin = Helper.btVector3FromThree(this.reference.position));
            bttransform.setRotation(btquarternion = Helper.btQuaternionFromThree(this.reference.quaternion));

            btmotionstate.setWorldTransform(bttransform);

            Helper.safeAmmoDestroy(btquarternion);
            Helper.safeAmmoDestroy(btorigin);
            Helper.safeAmmoDestroy(bttransform);
        }

        protected _setKinematicObject(isKinematic: boolean) {
            if (!this._btbody) {
                return;
            }

            let flags = this._btbody!.getCollisionFlags();
            if (isKinematic) {
                flags |= Ammo.CollisionFlags.CF_KINEMATIC_OBJECT;
            } else {
                flags &= ~Ammo.CollisionFlags.CF_KINEMATIC_OBJECT;
            }

            this._btbody.setCollisionFlags(flags);
        }

        protected _syncFromMotionState() {
            if (!this._btbody || this._btbody.isStaticOrKinematicObject()) {
                return;
            }

            const bttransform = new Ammo.btTransform();

            const btmotionstate = this._btbody.getMotionState() as Ammo.btMotionState;
            if (btmotionstate) {
                btmotionstate.getWorldTransform(bttransform);

                const btorigin = bttransform.getOrigin();
                const btrotation = bttransform.getRotation();

                this.reference.position.set(btorigin.x(), btorigin.y(), btorigin.z());
                this.reference.quaternion.set(btrotation.x(), btrotation.y(), btrotation.z(), btrotation.w());
            }

            Helper.safeAmmoDestroy(bttransform);
        }

        private _configureRigidBody() {
            const mass: number = Math.max(Mesh.minMass, Math.min(Mesh.maxMass, this._geometry.volumeOfShape * this._material.density));
            const isDynamic = mass !== 0;
            const btvecLocalInertia = new Ammo.btVector3(0, 0, 0);

            this._btmotionstate = new Ammo.btDefaultMotionState();
            this._getMotionState(this._btmotionstate);

            if (isDynamic) {
                this._geometry.btCollisionShape!.calculateLocalInertia(mass, btvecLocalInertia);
            }

            this._btinfo = new Ammo.btRigidBodyConstructionInfo(mass, this._btmotionstate, this._geometry.btCollisionShape!, btvecLocalInertia);
            this._btbody = new Ammo.btRigidBody(this._btinfo);

            this._setKinematicObject(true);

            Helper.safeAmmoDestroy(btvecLocalInertia);
        }

        private _removeRigidBody() {
            Helper.safeAmmoDestroy(this._btbody);

            Helper.safeAmmoDestroy(this._btinfo);
            Helper.safeAmmoDestroy(this._btmotionstate);
            Helper.safeAmmoDestroy(this._btshape);

            this._btbody =  null;
            this._btinfo = null;
            this._btmotionstate = null;
            this._btshape = null;
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
