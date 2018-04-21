/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='object.ts'/>

namespace pxsim {
    export class Scene3d extends Object3dMixin(THREE.Scene) {
        private _ambientlight: AmbientLight;
        private _camera: Camera;

        private _physicsworld: PhysicsWorld = new PhysicsWorld();

        private _raycaster: THREE.Raycaster;
        private _controls: THREE.OrbitControls;

        public get physicsWorld(): PhysicsWorld {
            return this._physicsworld;
        }

        constructor() {
            super();

            this.background = new ColorConstructor(Palette.LightGray);

            this._ambientlight = new AmbientLight();
            this.addAt(this._ambientlight, math3d.zeroVector());

            this._camera = new PerspectiveCamera();
            this.addAt(this._camera, new VectorConstructor(-40, 20, 15));

            this._raycaster = new THREE.Raycaster();

            this._controls = new THREE.OrbitControls(this._camera);
            this._controls.target.set(0, 2, 0);
            this._controls.update();
        }

        public get camera(): Camera {
            return this._camera;
        }

        public set camera(camera: Camera) {
            this._camera = camera;
        }

        public get backgroundColor(): Color {
            return this.background;
        }

        public set backgroundColor(color: Color) {
            this.background = color;
        }

        public get ambientColor(): Color {
            return this._ambientlight.color;
        }

        public set ambientColor(color: Color) {
            this._ambientlight.color = color;
        }

        public addAt(object3d: Object3d, position: Vector) {
            if (!object3d) {
                return;
            }

            object3d.position.copy(position);
            this.add(object3d);
        }

        public add(...objects3d: Object3d[]) {
            if (objects3d) {
                super.add(...objects3d);
                objects3d.forEach(object3d => object3d.onAdded(this));
            }
        }

        public remove(object3d: Object3d) {
            if (object3d) {
                object3d.onRemoved(this);
                super.remove(object3d);
            }
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

            this._raycaster.setFromCamera(new THREE.Vector2(x, y), this._camera);
            const intersections = this._raycaster.intersectObjects(this.children);

            return intersections ? intersections.map(intersection => intersection.object as any) : null;
        }

        public setPhysicsEnabled(enable: boolean) {
            /* TODO$: */
        }

        public copy(source: this, recursive?: boolean): this {
            super.copy(source, recursive);

            throw Error();
        }

        protected _onDispose() {
            super._onDispose();

            this._physicsworld.dispose();
        }
    }
}

namespace pxsim.scene {
    export function intersectedObjectAt(x: number, y: number): Object3d | null {
        const scene3d = pxsim.world.scene();
        const objects = scene3d ? scene3d.intersectedObjects(x, y) : null;

        return objects && objects.length > 0 ? objects[0] : null;
    }

    export function onAnimate(handler: RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.Scene, EventId.Animate, handler);
    }
}
