/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class PhysicsWorld /* rigid body physics */ extends rt.ObjectDisposable {
        private _btconfig: Ammo.btDefaultCollisionConfiguration;
        private _btdispatcher: Ammo.btCollisionDispatcher;
        private _btbroadphase: Ammo.btDbvtBroadphase;
        private _btconstraintsolver: Ammo.btSequentialImpulseConstraintSolver;

        private _btworld: Ammo.btDiscreteDynamicsWorld;

        public get btWorld() {
            return this._btworld;
        }

        constructor() {
            super();

            this._btconfig = new Ammo.btDefaultCollisionConfiguration();
            this._btdispatcher = new Ammo.btCollisionDispatcher(this._btconfig);
            this._btbroadphase = new Ammo.btDbvtBroadphase();
            this._btconstraintsolver = new Ammo.btSequentialImpulseConstraintSolver();

            this._btworld = new Ammo.btDiscreteDynamicsWorld(this._btdispatcher, this._btbroadphase, this._btconstraintsolver, this._btconfig);
        }

        public getGravity(): number {
            return this._btworld.getGravity().y();
        }

        public setGravity(gravity: number) {
            const btvecGravity = new Ammo.btVector3(0, gravity, 0);

            this._btworld.setGravity(btvecGravity);

            Helper.safeAmmoObjectDestroy(btvecGravity);
        }

        public animate(timeStep: number) {
            this._btworld.stepSimulation(timeStep, 10);
        }

        protected _onDispose() {
            Helper.safeAmmoObjectDestroy(this._btworld);

            Helper.safeAmmoObjectDestroy(this._btconstraintsolver);
            Helper.safeAmmoObjectDestroy(this._btbroadphase);
            Helper.safeAmmoObjectDestroy(this._btdispatcher);
            Helper.safeAmmoObjectDestroy(this._btconfig);
        }
    }
}
