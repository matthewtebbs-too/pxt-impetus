/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Ammo from 'ammo';

import * as Helper from './_helper';
import { PhysicsWorld } from './_physics';
import * as RT from './_runtime';
import { Object3d } from './object';
import { Shape3d } from './shape';

export function btMotionStateFromObject3d(btmotionstate: Ammo.btMotionState, object3d: Object3d) {
    const bttransform = new Ammo.btTransform();
    let btorigin, btquarternion;

    bttransform.setOrigin(btorigin = Helper.btVector3FromThree(object3d.position));
    bttransform.setRotation(btquarternion = Helper.btQuaternionFromThree(object3d.quaternion));

    btmotionstate.setWorldTransform(bttransform);

    Helper.safeAmmoObjectDestroy(btquarternion);
    Helper.safeAmmoObjectDestroy(btorigin);
    Helper.safeAmmoObjectDestroy(bttransform);

    return btmotionstate;
}

export function btMotionStateToObject3d(btmotionstate: Ammo.btMotionState, object3d: Object3d): void {
    const bttransform = new Ammo.btTransform();

    btmotionstate.getWorldTransform(bttransform);

    const btorigin = bttransform.getOrigin();
    const btrotation = bttransform.getRotation();

    object3d.position.set(btorigin.x(), btorigin.y(), btorigin.z());
    object3d.quaternion.set(btrotation.x(), btrotation.y(), btrotation.z(), btrotation.w());

    Helper.safeAmmoObjectDestroy(bttransform);
}

export class RigidBody extends RT.DisposableObject {
    private static _minMass = 0;
    private static _maxMass = 100;
    private static _defaultFriction = 1.;           /* Bullet physics default is .5 */
    private static _linearSleepingThreshold = 1.6;  /* Bullet physics default is .8 */
    private static _angularSleepingThreshold = 2.5; /* Bullet physics default is 1. */

    private _object3d: Object3d;

    private _btbody: Ammo.btRigidBody;
    private _btshape: Ammo.btCollisionShape;
    private _btmotionstate: Ammo.btMotionState;
    private _btinfo: Ammo.btRigidBodyConstructionInfo;

    private _mass = 0;
    private _btvecLocalInertia: Ammo.btVector3;

    public get isStatic(): boolean {
        return this._mass === 0;
    }

    public get isDynamic(): boolean {
        return !this.isStatic;
    }

    public get isKinematic(): boolean {
        return this._btbody.isKinematicObject();
    }

    public get isActive(): boolean {
        return this._btbody.isActive();
    }

    public set isKinematic(value: boolean) {
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

        this._object3d.matrixAutoUpdate = value;

        if (world) {
            this.addRigidBody(world);
        }
    }

    constructor(
        object3d: Object3d,
        shape3d: Shape3d,
        mass: number,
    ) {
        super();

        mass = Math.max(RigidBody._minMass, Math.min(RigidBody._maxMass, mass));

        const btmotionstate = new Ammo.btDefaultMotionState();
        const btshape = shape3d.btCollisionShape();

        this._mass = mass;
        this._btvecLocalInertia = new Ammo.btVector3();

        if (this.isDynamic) {
            btshape.calculateLocalInertia(this._mass, this._btvecLocalInertia);
        }

        const btinfo = new Ammo.btRigidBodyConstructionInfo(this._mass, btmotionstate, btshape, this._btvecLocalInertia);

        this._btbody = new Ammo.btRigidBody(btinfo);
        this._btbody.setFriction(RigidBody._defaultFriction);
        this._btbody.setSleepingThresholds(RigidBody._linearSleepingThreshold, RigidBody._angularSleepingThreshold);

        this._btshape = btshape;
        this._btmotionstate = btmotionstate;
        this._btinfo = btinfo;

        this._object3d = object3d;

        this.isKinematic = true; /* default is kinematic object */
    }

    public addRigidBody(world: PhysicsWorld) {
        btMotionStateFromObject3d(this._btmotionstate, this._object3d);
        world.addRigidBody(this._btbody, this._btmotionstate);
    }

    public removeRigidBody(world: PhysicsWorld) {
        world.removeRigidBody(this._btbody);
    }

    public syncMotionStateToObject3d() {
        if (!this._btbody.isStaticOrKinematicObject() /* motion controlled by physics world? */) {
            if (this.isActive) {
                btMotionStateToObject3d(this._btbody.getMotionState(), this._object3d);

                this._object3d.updateMatrix();
            }
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

        Helper.safeAmmoObjectDestroy(this._btvecLocalInertia);
    }
}
