/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class World3d extends rt.ObjectDisposable {
        protected static _sidFromMouseButtonEvent(event: MouseEvent): ScopeId | undefined {
            let sid;

            if (0 === event.button) {
                sid = ScopeId.MouseLeftButton;
            } else if (1 === event.button) {
                sid = ScopeId.MouseMiddleButton;
            } else if (2 === event.button) {
                sid = ScopeId.MouseRightButton;
            }

            return sid;
        }

        private _renderer: Renderer;

        private _scene: Scene3d | null = null;

        public get renderer(): Renderer {
            return this._renderer;
        }

        public get scene(): GenericScene3d | null {
            return this._scene;
        }

        constructor(id: rt.ObjId = 'container') {
            super();

            this._renderer = new Renderer(id);

            this._scene = new Scene3d();
            this._updateRendererScene();

            const container = document.getElementById(this._renderer.id as string);
            if (container) {
                container.innerHTML = '';

                if (Detector.webgl) {
                    container.appendChild(this._renderer.domElement);
                } else {
                    Detector.addGetWebGLMessage({ parent: container });
                }
            }

            this._onWindowResize();

            window.addEventListener('resize', this._onWindowResize, false);
            document.addEventListener('mousemove', this._onDocumentMouseMove, false);
            document.addEventListener('click', this._onDocumentMouseClick, false);
        }

        protected _onDispose() {
            document.removeEventListener('click', this._onDocumentMouseClick, false);
            document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
            window.removeEventListener('resize', this._onWindowResize, false);

            const container = document.getElementById(this._renderer.id as string);
            if (container) {
                container.innerHTML = '';
            }

            Helper.safeObjectDispose(this._renderer.scene); /* TODO$: put someplace else */

            this._renderer.dispose();
        }

        protected _updateRendererScene() {
            this._renderer.scene = this._scene;
        }

        protected _onWindowResize = () => {
            this._renderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
        }

        protected _onDocumentMouseMove = (event: MouseEvent) => this._onDocumentMouseEvent(ScopeId.MouseDevice, EventId.Move, event);
        protected _onDocumentMouseClick = (event: MouseEvent) => this._onDocumentMouseEvent(World3d._sidFromMouseButtonEvent(event), EventId.Click, event);

        protected _onDocumentMouseEvent = (sid: ScopeId | undefined, evid: EventId, event: MouseEvent) => {
            event.preventDefault();

            if (!sid) {
                return;
            }

            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = - (event.clientY / window.innerHeight) * 2 + 1;

            singletonWorldBoard().events!.queue(sid, evid, new EventCoordValue(x, y));
        }
    }
}

namespace pxsim.world {
    export function world(): World3d | null {
        return singletonWorldBoard().world;
    }

    export function origin(): Vector  {
        return pxsim.math3d.vector();
    }

    export function scene(): GenericScene3d | null {
        const world3d = pxsim.world.world();
        return world3d ? world3d.scene : null;
    }

    export function camera(): GenericCamera | null {
        const scene3d = pxsim.world.scene();
        return scene3d ? scene3d.camera : null;
    }

    export function intersectedObjectAt(x: number, y: number): GenericObject3d | null {
        const scene3d = pxsim.world.scene();
        const objects = scene3d ? scene3d.intersectedObjects(x, y) : null;

        return objects && objects.length > 0 ? objects[0] : null;
    }

    export function onMouseMove(handler: RefAction) {
        singletonWorldBoard().events!.listen(ScopeId.MouseDevice, EventId.Move, handler);
    }

    export function onMouseClick(button: MouseButton, handler: RefAction) {
        let sid;

        switch (button) {
            case MouseButton.Left:
                sid = ScopeId.MouseLeftButton;
                break;

            case MouseButton.Middle:
                sid = ScopeId.MouseMiddleButton;
                break;

            case MouseButton.Right:
                sid = ScopeId.MouseRightButton;
                break;

            default:
                return;
        }

        singletonWorldBoard().events!.listen(sid, EventId.Click, handler);
    }

}
