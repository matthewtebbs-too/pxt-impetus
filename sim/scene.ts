/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object3d.ts'/>

namespace pxsim {
    export class Scene extends Object3D<THREE.Scene> {
        private _physicsworld: PhysicsWorld = new PhysicsWorld();

        private _ambientlight: AmbientLight = new AmbientLight();

        public get physicsWorld(): PhysicsWorld {
            return this._physicsworld;
        }

        public get ambientLight(): AmbientLight {
            return this._ambientlight;
        }

        constructor(id?: rt.ObjId) {
            super(new THREE.Scene(), id);

            this.reference.background = new THREE.Color(Palette.lightgray);
            this.add(this._ambientlight);
        }

        public setBackgroundColor(color: Color)  {
            this.reference.background = color;
        }

        public setAmbientLight(color: Color)  {
            this.ambientLight.reference.color = color;
        }

        public addObject(object: GenericObject3D, position: Vector) {
            object.setPosition(position);

            this.add(object, true /* has rigid body */);
        }

        public animate(timeStep: number) {
            super.animate(timeStep);

            this._physicsworld.animate(timeStep);

            WorldBoard.events.queue(1234, 5678, timeStep);
        }

        public add(object: GenericObject3D, isRigidBody: boolean = false) {
            this.reference.add(object.reference);
            object.onAdded(this);
        }

        public remove(object: GenericObject3D) {
            object.onRemoved(this);
            this.reference.remove(object.reference);
        }

        protected _onDispose() {
            this._physicsworld.dispose();

            super._onDispose();
        }
    }
}

namespace pxsim.scene {
    export function onAnimate(handler: RefAction) {
        WorldBoard.events.listen(1234, 5678, handler);
    }
}
