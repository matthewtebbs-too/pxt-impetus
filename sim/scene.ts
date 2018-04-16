/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object.ts'/>

namespace pxsim {
    export class Scene3dImpl extends Object3dImpl<THREE.Scene> implements Scene3d {
        private _ambientlight: AmbientLight;
        private _camera: CameraImpl<THREE.Camera>;

        private _physicsworld: PhysicsWorld = new PhysicsWorld();

        private _raycaster: THREE.Raycaster;
        private _controls: THREE.OrbitControls | null = null;

        public get ambientLight(): AmbientLight {
            return this._ambientlight;
        }

        public get physicsWorld(): PhysicsWorld {
            return this._physicsworld;
        }

        constructor() {
            super(new THREE.Scene());

            this.reference.background = new THREE.Color(Palette.LightGray);

            this._ambientlight = new AmbientLight();
            this.add(this._ambientlight, math3d.zeroVector());

            this._camera = new PerspectiveCamera();
            this.add(this._camera, new Vector(-40, 20, 15));

            this._raycaster = new THREE.Raycaster();

            this._controls = new THREE.OrbitControls(this._camera.reference);
            this._controls.target.set(0, 2, 0);
            this._controls.update();
        }

        public get camera(): CameraImpl<THREE.Camera> {
            return this._camera;
        }

        public set camera(camera: CameraImpl<THREE.Camera>) {
            this._camera = camera;
        }

        public setBackgroundColor(value: Color)  {
            if (!value) {
                return;
            }

            this.reference.background = value;
        }

        public setAmbientLight(value: Color)  {
            if (!value) {
                return;
            }

            this.ambientLight.reference.color = value;
        }

        public add(object3d: Object3dImpl<THREE.Object3D>, position: Vector) {
            if (!object3d) {
                return;
            }

            object3d.setPosition(position);

            this.reference.add(object3d.reference);
            object3d.onAdded(this);
        }

        public remove(object3d: Object3dImpl<THREE.Object3D>) {
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

        public intersectedObjects(x: number, y: number): Object3d[] | null {
            if (!this._camera) {
                return null;
            }

            this._raycaster.setFromCamera(new THREE.Vector2(x, y), this._camera.reference);
            const intersections = this._raycaster.intersectObjects(this.reference.children);

            return intersections.length > 0 ? intersections.map(intersection => Object3dImpl.instantiate(intersection.object)) : null;
        }

        public setPhysicsEnabled(enable: boolean) {
            /* TODO$: */
        }

        protected _onDispose() {
            this._physicsworld.dispose();

            super._onDispose();
        }
    }
}

namespace pxsim.scene {
    export function origin(): Vector  {
        return pxsim.math3d.zeroVector();
    }

    export function intersectedObjectAt(x: number, y: number): Object3d | null {
        const scene3d = pxsim.world.scene();
        const objects = scene3d ? scene3d.intersectedObjects(x, y) : null;

        return objects && objects.length > 0 ? objects[0] : null;
    }

    export function onAnimate(handler: RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.Scene, EventId.Animate, handler);
    }
}
