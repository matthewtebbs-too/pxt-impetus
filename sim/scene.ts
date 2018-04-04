/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object.ts'/>

namespace pxsim {
    export abstract class Scene3d extends Object3d<THREE.Scene> {
        private _ambientlight: AmbientLight;
        private _camera: GenericCamera | null;

        private _physicsworld: PhysicsWorld = new PhysicsWorld();

        private _raycaster: THREE.Raycaster;
        private _controls: THREE.OrbitControls | null = null;

        public get ambientLight(): AmbientLight {
            return this._ambientlight;
        }

        public get physicsWorld(): PhysicsWorld {
            return this._physicsworld;
        }

        constructor(id?: rt.ObjId) {
            super(new THREE.Scene(), id);

            this.reference.background = new THREE.Color(Palette.LightGray);

            this._ambientlight = new AmbientLight();
            this.add(this._ambientlight);

            this._camera = new PerspectiveCamera();
            this.add(this._camera, new Vector(-40, 20, 15));

            this._raycaster = new THREE.Raycaster();

            this._controls = new THREE.OrbitControls(this._camera.reference);
            this._controls.target.set(0, 2, 0);
            this._controls.update();
        }

        public camera(): GenericCamera | null {
            return this._camera;
        }

        public setBackgroundColor(color: Color)  {
            if (!color) {
                return;
            }

            this.reference.background = color;
        }

        public setAmbientLight(color: Color)  {
            if (!color) {
                return;
            }

            this.ambientLight.reference.color = color;
        }

        public add(object3d: GenericObject3d, position?: Vector) {
            if (!object3d) {
                return;
            }

            if (position) {
                object3d.setPosition(position);
            }

            this.reference.add(object3d.reference);
            object3d.onAdded(this);
        }

        public remove(object3d: GenericObject3d) {
            if (!object3d) {
                return;
            }

            object3d.onRemoved(this);
            this.reference.remove(object3d.reference);
        }

        public animate(timeStep: number) {
            super.animate(timeStep);

            this._physicsworld.animate(timeStep);

            singletonWorldBoard().events!.queue(ScopeId.Scene, EventId.Animate, timeStep);
        }

        public intersectedObjects(x: number, y: number): GenericObject3d[] | null {
            if (!this._camera) {
                return null;
            }

            this._raycaster.setFromCamera(new THREE.Vector2(x, y), this._camera.reference);
            const intersections = this._raycaster.intersectObjects(this.reference.children);

            return intersections.length > 0 ? intersections.map(intersection => new GenericObject3d(intersection.object)) : null;
        }

        public setPhysicsEnabled(enable: boolean) {
            /* TODO$: */
        }

        protected _onDispose() {
            this._physicsworld.dispose();

            super._onDispose();
        }
    }

    export class GenericScene3d extends Scene3d { }
}

namespace pxsim.scene {
    export function origin(): Vector  {
        return pxsim.math3d.zeroVector();
    }

    export function onAnimate(handler: RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.Scene, EventId.Animate, handler);
    }
}
