/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_physics.ts"/>

namespace pxsim {
    export function btMotionStateFromObject3d(btmotionstate: Ammo.btMotionState, object3d: GenericObject3d) {
        const bttransform = new Ammo.btTransform();
        let btorigin, btquarternion;

        bttransform.setOrigin(btorigin = Helper.btVector3FromThree(object3d.reference.position));
        bttransform.setRotation(btquarternion = Helper.btQuaternionFromThree(object3d.reference.quaternion));

        btmotionstate.setWorldTransform(bttransform);

        Helper.safeAmmoObjectDestroy(btquarternion);
        Helper.safeAmmoObjectDestroy(btorigin);
        Helper.safeAmmoObjectDestroy(bttransform);

        return btmotionstate;
    }

    export function btMotionStateToObject3d(btmotionstate: Ammo.btMotionState, object3d: GenericObject3d): void {
        const bttransform = new Ammo.btTransform();

        btmotionstate.getWorldTransform(bttransform);

        const btorigin = bttransform.getOrigin();
        const btrotation = bttransform.getRotation();

        object3d.reference.position.set(btorigin.x(), btorigin.y(), btorigin.z());
        object3d.reference.quaternion.set(btrotation.x(), btrotation.y(), btrotation.z(), btrotation.w());

        Helper.safeAmmoObjectDestroy(bttransform);
    }

    export class RigidBody extends rt.DisposableObject {
        private static _minMass = 0;
        private static _maxMass = 100;
        private static _defaultFriction = .75;

        private _world: PhysicsWorld | null = null;

        private _object3d: GenericObject3d;

        private _btbody: Ammo.btRigidBody;
        private _btshape: Ammo.btCollisionShape;
        private _btmotionstate: Ammo.btMotionState;
        private _btinfo: Ammo.btRigidBodyConstructionInfo;

        public get isStatic(): boolean {
            return this._btbody.isStaticObject();
        }

        public set isStatic(value: boolean) {
            this._toggleCollisionFlag(Ammo.CollisionFlags.CF_STATIC_OBJECT, value);
        }

        public get isKinematic(): boolean {
            return this._btbody.isKinematicObject();
        }

        public set isKinematic(value: boolean) {
            this._toggleCollisionFlag(Ammo.CollisionFlags.CF_KINEMATIC_OBJECT, value);

            this._btbody.setActivationState(value ? Ammo.ActivationState.DISABLE_DEACTIVATION : Ammo.ActivationState.ACTIVE_TAG);

            if (!value) {
                this._btbody.activate();
            }

            if (this._world) {
                this.addRigidBody(this._world); /* will re-add */
            }
        }

        constructor(
            object3d: GenericObject3d,
            shape3d: GenericShape3d,
            mass: number,
        ) {
            super();

            mass = Math.max(RigidBody._minMass, Math.min(RigidBody._maxMass, mass));

            const isDynamic = mass !== 0;

            const btmotionstate = new Ammo.btDefaultMotionState();
            const btshape = shape3d.createCollisionShape()!;

            const btvecLocalInertia = new Ammo.btVector3(0, 0, 0);

            if (isDynamic) {
                btshape.calculateLocalInertia(mass, btvecLocalInertia);
            }

            const btinfo = new Ammo.btRigidBodyConstructionInfo(mass, btmotionstate, btshape, btvecLocalInertia);

            Helper.safeAmmoObjectDestroy(btvecLocalInertia);

            this._btbody = new Ammo.btRigidBody(btinfo);
            this._btshape = btshape;
            this._btmotionstate = btmotionstate;
            this._btinfo = btinfo;

            this._btbody.setFriction(RigidBody._defaultFriction);

            this.isStatic = !isDynamic;
            this.isKinematic = isDynamic;

            this._object3d = object3d;
        }

        public addRigidBody(world: PhysicsWorld) {
            this.removeRigidBody(world);

            btMotionStateFromObject3d(this._btmotionstate, this._object3d);
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

        public syncMotionStateToObject3d() {
            if (!this._btbody.isStaticOrKinematicObject() /* is dynamic? */) {
                btMotionStateToObject3d(this._btbody.getMotionState(), this._object3d);
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
            Helper.safeAmmoObjectDestroy(this._btbody);

            Helper.safeAmmoObjectDestroy(this._btinfo);
            Helper.safeAmmoObjectDestroy(this._btmotionstate);
            Helper.safeAmmoObjectDestroy(this._btshape);
        }
    }
}
