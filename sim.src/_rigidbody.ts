/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Ammo from 'ammo';

import * as Helper from './_helper';
import { PhysicsWorld } from './_physics';
import * as RT from './_runtime';
import { IObject3dPose } from './object';

export function btMotionStateFromObject3dPose(btmotionstate: Ammo.btMotionState, pose: IObject3dPose) {
    const bttransform = new Ammo.btTransform();
    let btposition, btquarternion;

    bttransform.setOrigin(btposition = Helper.btVector3FromThree(pose.position));
    bttransform.setRotation(btquarternion = Helper.btQuaternionFromThree(pose.quaternion));

    btmotionstate.setWorldTransform(bttransform);

    Helper.safeAmmoObjectDestroy(btquarternion);
    Helper.safeAmmoObjectDestroy(btposition);
    Helper.safeAmmoObjectDestroy(bttransform);

    return btmotionstate;
}

export function btMotionStateToObject3dPose(btmotionstate: Ammo.btMotionState, pose: IObject3dPose): void {
    const bttransform = new Ammo.btTransform();

    btmotionstate.getWorldTransform(bttransform);

    const btorigin = bttransform.getOrigin();
    const btrotation = bttransform.getRotation();

    pose.position.set(btorigin.x(), btorigin.y(), btorigin.z());
    pose.quaternion.set(btrotation.x(), btrotation.y(), btrotation.z(), btrotation.w());

    Helper.safeAmmoObjectDestroy(bttransform);
}

export class RigidBody extends RT.DisposableObject {
    private static _minMass = 0;
    private static _maxMass = 100;
    private static _defaultFriction = 1.;           /* Bullet physics default is .5 */
    private static _linearSleepingThreshold = 1.6;  /* Bullet physics default is .8 */
    private static _angularSleepingThreshold = 2.5; /* Bullet physics default is 1. */

    //private _object3d: Object3d;

    private _btbody: Ammo.btRigidBody;
    private _btshape: Ammo.btCollisionShape;
    private _btmotionstate: Ammo.btMotionState;
    private _btinfo: Ammo.btRigidBodyConstructionInfo;

    private _mass = 0;
    private _btvecLocalInertia: Ammo.btVector3;

    public get isStatic(): boolean {
        return this._mass === 0;
    }

    public get isKinematic(): boolean {
        return this._btbody && this._btbody.isKinematicObject();
    }

    public get isStaticOrKinematicObject(): boolean {
        return this._btbody && this._btbody.isStaticOrKinematicObject();
    }

    public get isActive(): boolean {
        return this._btbody && this._btbody.isActive();
    }

    constructor(mass: number, btshape: Ammo.btCollisionShape) {
        super();

        mass = Math.max(RigidBody._minMass, Math.min(RigidBody._maxMass, mass));

        this._mass = mass;
        this._btmotionstate = new Ammo.btDefaultMotionState();
        this._btshape = btshape;
        this._btvecLocalInertia = new Ammo.btVector3();

        if (!this.isStatic) {
            this._btshape.calculateLocalInertia(this._mass, this._btvecLocalInertia);
        }

        const btinfo = new Ammo.btRigidBodyConstructionInfo(this._mass, this._btmotionstate, this._btshape, this._btvecLocalInertia);

        this._btbody = new Ammo.btRigidBody(btinfo);
        this._btbody.setFriction(RigidBody._defaultFriction);
        this._btbody.setSleepingThresholds(RigidBody._linearSleepingThreshold, RigidBody._angularSleepingThreshold);

        this._btinfo = btinfo;

        this.setIsKinematic(); /* default is kinematic object */
    }

    public setIsKinematic(value: boolean = true, object3d?: IObject3dPose) {
        if (this.isStatic) {
            return; /* not for static objects */
        }

        const world = PhysicsWorld.worldOfRigidBody(this._btbody);
        if (world) {
            this.removeRigidBody(world);
        }

        this._btbody.setMassProps(value ? 0 : this._mass, this._btvecLocalInertia);
        this._toggleCollisionFlag(Ammo.CollisionFlags.CF_KINEMATIC_OBJECT, value);
        this._btbody.activate();

        if (world) {
            if (object3d) {
                this.addRigidBody(world, object3d);
            }
        }
    }

    public addRigidBody(world: PhysicsWorld, object3d: IObject3dPose) {
        btMotionStateFromObject3dPose(this._btmotionstate, object3d);
        world.addRigidBody(this._btbody, this._btmotionstate);
    }

    public removeRigidBody(world: PhysicsWorld) {
        world.removeRigidBody(this._btbody);
    }

    public syncMotionStateToObject3d(object3d: IObject3dPose): boolean {
        if (this.isStaticOrKinematicObject || !this.isActive) {
            return false;
        }

        btMotionStateToObject3dPose(this._btbody.getMotionState(), object3d);
        return true;
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

        Helper.safeAmmoObjectDestroy(this._btvecLocalInertia);
    }
}
