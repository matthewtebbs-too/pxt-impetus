/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Ammo from 'ammo';
import * as THREE from 'three';

import * as Helper from './_helper';
import * as RT from './_runtime';

export class PhysicsWorld /* rigid body physics */ extends RT.DisposableObject {
    public static worldOfRigidBody(btbody: Ammo.btRigidBody): PhysicsWorld | null {
        return PhysicsWorld._objectcache.get((btbody as any)._uuid) || null;
    }

    private static _objectcache = new Map<RT.ObjId, PhysicsWorld>();

    private static _numIterationsSolver = 4;
    private static _maxStepSimulation = 2;      /* min 30 fps */
    private static _fixedTimeStep = 1 / 60;     /* normal 60 fps */

    private _uuid = THREE.Math.generateUUID();

    private _btconfig: Ammo.btDefaultCollisionConfiguration;
    private _btdispatcher: Ammo.btCollisionDispatcher;
    private _btbroadphase: Ammo.btDbvtBroadphase;
    private _btconstraintsolver: Ammo.btSequentialImpulseConstraintSolver;

    private _btworld: Ammo.btDiscreteDynamicsWorld;

    constructor() {
        super();

        PhysicsWorld._objectcache.set(this._uuid, this);

        this._btconfig = new Ammo.btDefaultCollisionConfiguration();
        this._btdispatcher = new Ammo.btCollisionDispatcher(this._btconfig);
        this._btbroadphase = new Ammo.btDbvtBroadphase();
        this._btconstraintsolver = new Ammo.btSequentialImpulseConstraintSolver();

        this._btworld = new Ammo.btDiscreteDynamicsWorld(this._btdispatcher, this._btbroadphase, this._btconstraintsolver, this._btconfig);

        this._btworld.getSolverInfo().m_numIterations = PhysicsWorld._numIterationsSolver;
    }

    public getGravity(): number {
        return this._btworld.getGravity().y();
    }

    public setGravity(gravity: number) {
        const btvecGravity = new Ammo.btVector3(0, gravity, 0);

        this._btworld.setGravity(btvecGravity);

        Helper.safeAmmoObjectDestroy(btvecGravity);
    }

    public addRigidBody(btbody: Ammo.btRigidBody, btmotionstate: Ammo.btMotionState) {
        this.removeRigidBody(btbody);

        btbody.setMotionState(btmotionstate);
        this._btworld.addRigidBody(btbody);
        (btbody as any)._uuid = this._uuid;
    }

    public removeRigidBody(btbody: Ammo.btRigidBody) {
        if ((btbody as any)._uuid !== this._uuid) {
            return;
        }

        this._btworld.removeRigidBody(btbody);
    }

    public animate(timeStep: number) {
        this._btworld.stepSimulation(timeStep, PhysicsWorld._maxStepSimulation, PhysicsWorld._fixedTimeStep);
    }

    protected _onDispose() {
        Helper.safeAmmoObjectDestroy(this._btworld);

        Helper.safeAmmoObjectDestroy(this._btconstraintsolver);
        Helper.safeAmmoObjectDestroy(this._btbroadphase);
        Helper.safeAmmoObjectDestroy(this._btdispatcher);
        Helper.safeAmmoObjectDestroy(this._btconfig);

        PhysicsWorld._objectcache.delete(this._uuid);
    }
}
