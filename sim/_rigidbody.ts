/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

namespace pxsim {
    export function btMotionStateFromObject3D(object3d: GenericObject3D) {
        const bttransform = new Ammo.btTransform();
        let btorigin, btquarternion;

        bttransform.setOrigin(btorigin = Helper.btVector3FromThree(object3d.reference.position));
        bttransform.setRotation(btquarternion = Helper.btQuaternionFromThree(object3d.reference.quaternion));

        const btmotionstate = new Ammo.btDefaultMotionState();
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

        private _btbody: Ammo.btRigidBody;
        private _btshape: Ammo.btCollisionShape;
        private _btmotionstate: Ammo.btMotionState;
        private _btinfo: Ammo.btRigidBodyConstructionInfo;

        public get btRigidBody() {
            return this._btbody;
        }

        constructor(
            object3d: GenericObject3D,
            geometry: GenericGeometry,
            mass: number,
        ) {
            super();

            mass = Math.max(RigidBody.minMass, Math.min(RigidBody.maxMass, mass));

            const isDynamic = mass !== 0;

            const btmotionstate = btMotionStateFromObject3D(object3d);
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

            this.setKinematicObject(false);
        }

        public setKinematicObject(isKinematic: boolean) {
            let flags = this._btbody.getCollisionFlags();
            if (isKinematic) {
                flags |= Ammo.CollisionFlags.CF_KINEMATIC_OBJECT;
            } else {
                flags &= ~Ammo.CollisionFlags.CF_KINEMATIC_OBJECT;
            }

            this._btbody.setCollisionFlags(flags);
        }

        public syncMotionStateToObject3D(object3d: GenericObject3D) {
            if (!this._btbody.isStaticOrKinematicObject() /* is dynamic? */) {
                btMotionStateToObject3D(this._btbody.getMotionState(), object3d);
            }
        }

        protected _onDispose() {
            Helper.safeAmmoDestroy(this._btbody);

            Helper.safeAmmoDestroy(this._btinfo);
            Helper.safeAmmoDestroy(this._btmotionstate);
            Helper.safeAmmoDestroy(this._btshape);
        }
    }
}
