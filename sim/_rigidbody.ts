/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_physics.ts"/>

namespace pxsim {
    export function btMotionStateFromObject3D(btmotionstate: Ammo.btMotionState, object3d: GenericObject3D) {
        const bttransform = new Ammo.btTransform();
        let btorigin, btquarternion;

        bttransform.setOrigin(btorigin = Helper.btVector3FromThree(object3d.reference.position));
        bttransform.setRotation(btquarternion = Helper.btQuaternionFromThree(object3d.reference.quaternion));

        btmotionstate.setWorldTransform(bttransform);

        Helper.safeAmmoDestroy(btquarternion);
        Helper.safeAmmoDestroy(btorigin);
        Helper.safeAmmoDestroy(bttransform);

        return btmotionstate;
    }

    export function btMotionStateToObject3D(btmotionstate: Ammo.btMotionState, object3d: GenericObject3D): void {
        const bttransform = new Ammo.btTransform();

        btmotionstate.getWorldTransform(bttransform);

        const btorigin = bttransform.getOrigin();
        const btrotation = bttransform.getRotation();

        object3d.reference.position.set(btorigin.x(), btorigin.y(), btorigin.z());
        object3d.reference.quaternion.set(btrotation.x(), btrotation.y(), btrotation.z(), btrotation.w());

        Helper.safeAmmoDestroy(bttransform);
    }

    export class RigidBody extends rt.ObjectDisposable {
        public static minMass = 0;
        public static maxMass = 100;

        private _world: PhysicsWorld | null = null;

        private _object3d: GenericObject3D;

        private _btbody: Ammo.btRigidBody;
        private _btshape: Ammo.btCollisionShape;
        private _btmotionstate: Ammo.btMotionState;
        private _btinfo: Ammo.btRigidBodyConstructionInfo;

        constructor(
            object3d: GenericObject3D,
            geometry: GenericGeometry,
            mass: number,
        ) {
            super();

            mass = Math.max(RigidBody.minMass, Math.min(RigidBody.maxMass, mass));

            const isDynamic = mass !== 0;

            const btmotionstate = new Ammo.btDefaultMotionState();
            const btshape = geometry.createCollisionShape()!;

            const btvecLocalInertia = new Ammo.btVector3(0, 0, 0);

            if (isDynamic) {
                btshape.calculateLocalInertia(mass, btvecLocalInertia);
            }

            const btinfo = new Ammo.btRigidBodyConstructionInfo(mass, btmotionstate, btshape, btvecLocalInertia);

            Helper.safeAmmoDestroy(btvecLocalInertia);

            this._btbody = new Ammo.btRigidBody(btinfo);
            this._btshape = btshape;
            this._btmotionstate = btmotionstate;
            this._btinfo = btinfo;

            this.setStaticObject(!isDynamic);
            this.setKinematicObject(isDynamic);

            this._object3d = object3d;
        }

        public setStaticObject(isStatic: boolean) {
            this._toggleCollisionFlag(Ammo.CollisionFlags.CF_STATIC_OBJECT, isStatic);
        }

        public setKinematicObject(isKinematic: boolean) {
            this._toggleCollisionFlag(Ammo.CollisionFlags.CF_KINEMATIC_OBJECT, isKinematic);

            this._btbody.setActivationState(isKinematic ? Ammo.ActivationState.DISABLE_DEACTIVATION : Ammo.ActivationState.ACTIVE_TAG);

            if (!isKinematic) {
                this._btbody.activate();
            }

            if (this._world) {
                this.addRigidBody(this._world); /* will re-add */
            }
        }

        public addRigidBody(world: PhysicsWorld) {
            this.removeRigidBody(world);

            btMotionStateFromObject3D(this._btmotionstate, this._object3d);
            this._btbody.setMotionState(this._btmotionstate);

            this._world = world;
            this._world.btWorld.addRigidBody(this._btbody);
        }

        public removeRigidBody(world: PhysicsWorld) {
            if (this._world !== world) {
                return;
            }

            this._world.btWorld.removeRigidBody(this._btbody);
            this._world = null;
        }

        public syncMotionStateToObject3D() {
            if (!this._btbody.isStaticOrKinematicObject() /* is dynamic? */) {
                btMotionStateToObject3D(this._btbody.getMotionState(), this._object3d);
            }
        }

        protected _toggleCollisionFlag(flag: number, on: boolean) {
            let flags = this._btbody.getCollisionFlags();

            if (on) {
                flags |= flag;
            } else {
                flags &= ~flag;
            }

            this._btbody.setCollisionFlags(flags);
        }

        protected _onDispose() {
            Helper.safeAmmoDestroy(this._btbody);

            Helper.safeAmmoDestroy(this._btinfo);
            Helper.safeAmmoDestroy(this._btmotionstate);
            Helper.safeAmmoDestroy(this._btshape);
        }
    }
}
