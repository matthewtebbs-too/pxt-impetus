"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var rt;
(function (rt) {
    var ObjectDisposable = (function () {
        function ObjectDisposable() {
            this._isDisposed = false;
        }
        ObjectDisposable.prototype.dispose = function () {
            if (!this._isDisposed) {
                this._onDispose();
                this._isDisposed = true;
            }
        };
        return ObjectDisposable;
    }());
    rt.ObjectDisposable = ObjectDisposable;
    var ObjectWithId = (function (_super) {
        __extends(ObjectWithId, _super);
        function ObjectWithId(id) {
            var _this = _super.call(this) || this;
            _this._id = id || '';
            return _this;
        }
        Object.defineProperty(ObjectWithId.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        return ObjectWithId;
    }(ObjectDisposable));
    rt.ObjectWithId = ObjectWithId;
    var WrappedObjectWithId = (function (_super) {
        __extends(WrappedObjectWithId, _super);
        function WrappedObjectWithId(reference, id) {
            var _this = _super.call(this, id) || this;
            _this._reference = reference;
            return _this;
        }
        Object.defineProperty(WrappedObjectWithId.prototype, "reference", {
            get: function () { return this._reference; },
            enumerable: true,
            configurable: true
        });
        return WrappedObjectWithId;
    }(ObjectWithId));
    rt.WrappedObjectWithId = WrappedObjectWithId;
    var ObjectWithIdCache = (function () {
        function ObjectWithIdCache() {
            this._objs = new Map();
        }
        ObjectWithIdCache.prototype.set = function (obj) {
            return this._objs.set(obj.id, obj);
        };
        ObjectWithIdCache.prototype.retrieve = function (id) {
            return this._objs.get(id) || null;
        };
        ObjectWithIdCache.prototype.delete = function (obj) {
            return this._objs.delete(obj.id);
        };
        return ObjectWithIdCache;
    }());
    rt.ObjectWithIdCache = ObjectWithIdCache;
})(rt || (rt = {}));
var pxsim;
(function (pxsim) {
    var Object3D = (function (_super) {
        __extends(Object3D, _super);
        function Object3D(reference, id) {
            var _this = _super.call(this, reference, id) || this;
            _this.reference.name = _this.id;
            _this.reference.userData = __assign({}, _this.reference.userData, { outer: _this });
            if (undefined !== _this.reference.castShadow) {
                _this.reference.castShadow = true;
            }
            if (undefined !== _this.reference.receiveShadow) {
                _this.reference.receiveShadow = true;
            }
            return _this;
        }
        Object3D.prototype.lookAt = function (position) {
            this.reference.lookAt(position);
        };
        Object3D.prototype.resize = function (width, height) {
        };
        Object3D.prototype.setPosition = function (position) {
            this.reference.position.set(position.x, position.y, position.z);
        };
        Object3D.prototype.setRotation = function (rotation) {
            this.reference.rotation.set(THREE.Math.degToRad(rotation.x), THREE.Math.degToRad(rotation.y), THREE.Math.degToRad(rotation.z));
        };
        Object3D.prototype.setScale = function (scale) {
            this.reference.scale.set(scale.x, scale.y, scale.z);
        };
        Object3D.prototype.setRotationFromAxisAngle = function (axis, angle) {
            this.reference.setRotationFromAxisAngle(axis, THREE.Math.degToRad(angle));
        };
        Object3D.prototype.animate = function (timeStep) {
            this.reference.children.forEach(function (reference) {
                var outer = outerObject(reference);
                if (outer) {
                    outer.animate(timeStep);
                }
            });
        };
        Object3D.prototype.onAdded = function (scene) {
        };
        Object3D.prototype.onRemoved = function (scene) {
        };
        Object3D.prototype._onDispose = function () {
            this.reference.children.forEach(function (reference) {
                var outer = outerObject(reference);
                if (outer) {
                    outer.dispose();
                }
            });
            this.reference.userData = __assign({}, this.reference.userData, { outer: null });
        };
        return Object3D;
    }(rt.WrappedObjectWithId));
    pxsim.Object3D = Object3D;
    function outerObject(reference) {
        return reference.userData.outer || null;
    }
    pxsim.outerObject = outerObject;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Camera;
    }(pxsim.Object3D));
    pxsim.Camera = Camera;
    var PerspectiveCamera = (function (_super) {
        __extends(PerspectiveCamera, _super);
        function PerspectiveCamera(id) {
            var _this = _super.call(this, new THREE.PerspectiveCamera(), id) || this;
            _this.reference.fov = 60;
            _this.reference.near = 0.2;
            _this.reference.far = 2000;
            return _this;
        }
        PerspectiveCamera.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this.reference.aspect = width / height;
            this.reference.updateProjectionMatrix();
        };
        return PerspectiveCamera;
    }(Camera));
    pxsim.PerspectiveCamera = PerspectiveCamera;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var camera;
    (function (camera) {
        function perspectiveCamera() {
            return new pxsim.PerspectiveCamera();
        }
        camera.perspectiveCamera = perspectiveCamera;
    })(camera = pxsim.camera || (pxsim.camera = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Color = (function (_super) {
        __extends(Color, _super);
        function Color() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Color;
    }(THREE.Color));
    pxsim.Color = Color;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var color;
    (function (color_1) {
        function colorStandard(rgb) {
            return new pxsim.Color(rgb);
        }
        color_1.colorStandard = colorStandard;
        function colorRandom() {
            return new pxsim.Color(Math.random() * (1 << 24));
        }
        color_1.colorRandom = colorRandom;
        function colorFromRgb(red, green, blue) {
            return new pxsim.Color(red / 255, green / 255, blue / 255);
        }
        color_1.colorFromRgb = colorFromRgb;
        function colorFromHsv(hue, sat, val) {
            return new pxsim.Color().setHSL(hue / 255, sat / 255, val / 255);
        }
        color_1.colorFromHsv = colorFromHsv;
        function colorWheelPicker(color) {
            return new pxsim.Color(color);
        }
        color_1.colorWheelPicker = colorWheelPicker;
        function colorNumberPicker(color) {
            return new pxsim.Color(color);
        }
        color_1.colorNumberPicker = colorNumberPicker;
    })(color = pxsim.color || (pxsim.color = {}));
})(pxsim || (pxsim = {}));
var serial;
(function (serial) {
    function writeString(text) {
        console.log(text);
        pxsim.runtime.board.writeSerial(text);
    }
    function writeLine(text) {
        writeString(text + "\r\n");
    }
    serial.writeLine = writeLine;
    function writeValue(name, value) {
        writeLine("" + (name ? name + ':' : '') + value);
    }
    serial.writeValue = writeValue;
})(serial || (serial = {}));
var pxsim;
(function (pxsim) {
    var console;
    (function (console) {
        function log(text) {
            serial.writeLine(text);
        }
        console.log = log;
        function logValue(name, value) {
            serial.writeValue(name, value);
        }
        console.logValue = logValue;
    })(console = pxsim.console || (pxsim.console = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Geometry = (function (_super) {
        __extends(Geometry, _super);
        function Geometry() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._volume = 0;
            _this._ctorCollisionShape = null;
            return _this;
        }
        Object.defineProperty(Geometry.prototype, "volume", {
            get: function () {
                return this._volume;
            },
            enumerable: true,
            configurable: true
        });
        Geometry.prototype.createCollisionShape = function () {
            return this._ctorCollisionShape ? this._ctorCollisionShape() : null;
        };
        Geometry.prototype._onDispose = function () {
        };
        Geometry.prototype._setShapeVolume = function (volume) {
            this._volume = volume;
        };
        Geometry.prototype._setCtorCollisionShape = function (ctor) {
            this._ctorCollisionShape = ctor;
        };
        Geometry.prototype._getBounds = function (target) {
            this.reference.computeBoundingBox();
            return this.reference.boundingBox.getSize(target);
        };
        Geometry.prototype._createCollisionShapeFromHalfExtents = function (ctor) {
            var bthalfextents = pxsim.Helper.btVector3FromThree(this._getBounds(new THREE.Vector3()).divideScalar(2));
            var btshape = ctor(bthalfextents);
            btshape.setMargin(Geometry.collisionMargin);
            pxsim.Helper.safeAmmoDestroy(bthalfextents);
            return btshape;
        };
        Geometry.radialSegments = 32;
        Geometry.collisionMargin = 0.05;
        return Geometry;
    }(rt.WrappedObjectWithId));
    pxsim.Geometry = Geometry;
    var PlaneGeometry = (function (_super) {
        __extends(PlaneGeometry, _super);
        function PlaneGeometry(width, height, id) {
            var _this = this;
            var w = width || 100;
            var h = height || 100;
            _this = _super.call(this, new THREE.PlaneGeometry(w, h).rotateX(-Math.PI / 2), id) || this;
            _this._setCtorCollisionShape(function () { return _this._createCollisionShapeFromHalfExtents(function (bthalfextents) { return new Ammo.btBoxShape(bthalfextents); }); });
            return _this;
        }
        return PlaneGeometry;
    }(Geometry));
    pxsim.PlaneGeometry = PlaneGeometry;
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry(width, height, depth, openEnded, id) {
            var _this = this;
            width = width || 1;
            height = height || 1;
            depth = depth || 1;
            _this = _super.call(this, new THREE.BoxGeometry(width, height, depth), id) || this;
            _this._setShapeVolume(width * height * depth);
            _this._setCtorCollisionShape(function () { return _this._createCollisionShapeFromHalfExtents(function (bthalfextents) { return new Ammo.btBoxShape(bthalfextents); }); });
            return _this;
        }
        return BoxGeometry;
    }(Geometry));
    pxsim.BoxGeometry = BoxGeometry;
    var CylinderGeometry = (function (_super) {
        __extends(CylinderGeometry, _super);
        function CylinderGeometry(radius, height, openEnded, id) {
            var _this = this;
            radius = radius || .5;
            height = height || 1;
            _this = _super.call(this, new THREE.CylinderGeometry(radius, radius, height, Geometry.radialSegments, 1, openEnded || false), id) || this;
            _this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height);
            _this._setCtorCollisionShape(function () { return _this._createCollisionShapeFromHalfExtents(function (bthalfextents) { return new Ammo.btCylinderShape(bthalfextents); }); });
            return _this;
        }
        return CylinderGeometry;
    }(Geometry));
    pxsim.CylinderGeometry = CylinderGeometry;
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry(radius, id) {
            var _this = this;
            radius = radius || .5;
            _this = _super.call(this, new THREE.SphereGeometry(radius, Geometry.radialSegments, Geometry.radialSegments), id) || this;
            _this._setShapeVolume(4 / 3 * Math.PI * Math.pow(radius, 3));
            _this._setCtorCollisionShape(function () { return new Ammo.btSphereShape(radius); });
            return _this;
        }
        return SphereGeometry;
    }(Geometry));
    pxsim.SphereGeometry = SphereGeometry;
    var ConeGeometry = (function (_super) {
        __extends(ConeGeometry, _super);
        function ConeGeometry(radius, height, id) {
            var _this = this;
            radius = radius || .5;
            height = height || 1;
            _this = _super.call(this, new THREE.ConeGeometry(radius, height, Geometry.radialSegments), id) || this;
            _this._setShapeVolume(Math.PI * Math.pow(radius, 2) * height / 3);
            _this._setCtorCollisionShape(function () { return new Ammo.btConeShape(radius, height); });
            return _this;
        }
        return ConeGeometry;
    }(Geometry));
    pxsim.ConeGeometry = ConeGeometry;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var geometry;
    (function (geometry) {
        function planeGeometry(width, height) {
            return new pxsim.PlaneGeometry(width, height);
        }
        geometry.planeGeometry = planeGeometry;
        function boxGeometry(width, height, depth) {
            return new pxsim.BoxGeometry(width, height, depth);
        }
        geometry.boxGeometry = boxGeometry;
        function cylinderGeometry(radius, height) {
            return new pxsim.CylinderGeometry(radius, height);
        }
        geometry.cylinderGeometry = cylinderGeometry;
        function sphereGeometry(radius) {
            return new pxsim.SphereGeometry(radius);
        }
        geometry.sphereGeometry = sphereGeometry;
        function coneGeometry(radius, height) {
            return new pxsim.ConeGeometry(radius, height);
        }
        geometry.coneGeometry = coneGeometry;
    })(geometry = pxsim.geometry || (pxsim.geometry = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Light = (function (_super) {
        __extends(Light, _super);
        function Light() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Light.prototype._configureShadow = function () {
            this.reference.shadow.camera.left = -Light.distFrustum;
            this.reference.shadow.camera.right = Light.distFrustum;
            this.reference.shadow.camera.top = Light.distFrustum;
            this.reference.shadow.camera.bottom = -Light.distFrustum;
            this.reference.shadow.bias = 0.0001;
            this.reference.shadow.mapSize.width = 2048;
            this.reference.shadow.mapSize.height = 2048;
        };
        Light.distFrustum = 100;
        return Light;
    }(pxsim.Object3D));
    pxsim.Light = Light;
    var AmbientLight = (function (_super) {
        __extends(AmbientLight, _super);
        function AmbientLight(color, intensity, id) {
            return _super.call(this, new THREE.AmbientLight(color || 4210752, intensity || 1), id) || this;
        }
        return AmbientLight;
    }(Light));
    pxsim.AmbientLight = AmbientLight;
    var DirectionalLight = (function (_super) {
        __extends(DirectionalLight, _super);
        function DirectionalLight(color, intensity, id) {
            var _this = _super.call(this, new THREE.DirectionalLight(color || 16777215, intensity || 1), id) || this;
            _this._configureShadow();
            return _this;
        }
        return DirectionalLight;
    }(Light));
    pxsim.DirectionalLight = DirectionalLight;
    var HemisphereLight = (function (_super) {
        __extends(HemisphereLight, _super);
        function HemisphereLight(colorSky, colorGround, intensity, id) {
            return _super.call(this, new THREE.HemisphereLight(colorSky || 3310847, 16763007, intensity || 0.6), id) || this;
        }
        return HemisphereLight;
    }(Light));
    pxsim.HemisphereLight = HemisphereLight;
    var PointLight = (function (_super) {
        __extends(PointLight, _super);
        function PointLight(color, intensity, distance, decay, id) {
            var _this = _super.call(this, new THREE.PointLight(color || 16777215, intensity || 1, distance || 0, decay || 2), id) || this;
            _this._configureShadow();
            return _this;
        }
        return PointLight;
    }(Light));
    pxsim.PointLight = PointLight;
    var SpotLight = (function (_super) {
        __extends(SpotLight, _super);
        function SpotLight(color, intensity, distance, angle, penumbra, decay, id) {
            var _this = _super.call(this, new THREE.SpotLight(color || 16777215, intensity || 1, distance || 0, angle || Math.PI / 3, penumbra || 0, decay || 2), id) || this;
            _this._configureShadow();
            return _this;
        }
        return SpotLight;
    }(Light));
    pxsim.SpotLight = SpotLight;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var light;
    (function (light) {
        function ambientLight(color, intensity) {
            return new pxsim.DirectionalLight(color, intensity);
        }
        light.ambientLight = ambientLight;
        function directionalLight(color, intensity) {
            return new pxsim.DirectionalLight(color, intensity);
        }
        light.directionalLight = directionalLight;
        function hemisphereLight(colorSky, colorGround, intensity) {
            return new pxsim.HemisphereLight(colorSky, colorGround, intensity);
        }
        light.hemisphereLight = hemisphereLight;
    })(light = pxsim.light || (pxsim.light = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var loops;
    (function (loops) {
        function forever(body) {
            pxsim.thread.forever(body);
        }
        loops.forever = forever;
        function pauseAsync(ms) {
            return Promise.delay(ms);
        }
        loops.pauseAsync = pauseAsync;
    })(loops = pxsim.loops || (pxsim.loops = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Material = (function (_super) {
        __extends(Material, _super);
        function Material(solidColor, id) {
            var _this = _super.call(this, new THREE.MeshPhongMaterial({ color: solidColor || 16777215 }), id) || this;
            _this._density = 1;
            return _this;
        }
        Object.defineProperty(Material.prototype, "density", {
            get: function () {
                return this._density;
            },
            enumerable: true,
            configurable: true
        });
        Material.prototype._onDispose = function () {
        };
        return Material;
    }(rt.WrappedObjectWithId));
    pxsim.Material = Material;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var material;
    (function (material) {
        function colorMaterial(color) {
            return new pxsim.Material(color);
        }
        material.colorMaterial = colorMaterial;
    })(material = pxsim.material || (pxsim.material = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Vector = (function (_super) {
        __extends(Vector, _super);
        function Vector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Vector.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ", " + this.z + ")";
        };
        return Vector;
    }(THREE.Vector3));
    pxsim.Vector = Vector;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var math;
    (function (math) {
        function degreesInRadians(degrees) {
            return THREE.Math.degToRad(degrees);
        }
        math.degreesInRadians = degreesInRadians;
        function radiansInDegrees(radians) {
            return THREE.Math.radToDeg(radians);
        }
        math.radiansInDegrees = radiansInDegrees;
    })(math = pxsim.math || (pxsim.math = {}));
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var math3d;
    (function (math3d) {
        function vector(x, y, z) {
            return new pxsim.Vector(x || 0, y || 0, z || 0);
        }
        math3d.vector = vector;
        function unitVector() {
            return vector(1, 1, 1);
        }
        math3d.unitVector = unitVector;
        function vectorOp(a, op, b) {
            var result = vector();
            switch (op) {
                case 1:
                    return result.addVectors(a, b);
                case 2:
                    return result.subVectors(a, b);
                case 3:
                    return result.multiplyVectors(a, b);
            }
            throw new Error();
        }
        math3d.vectorOp = vectorOp;
        function vectorScalarOp(a, op, s) {
            var result = a;
            switch (op) {
                case 1:
                    return result.addScalar(s);
                case 2:
                    return result.subScalar(s);
                case 3:
                    return result.multiplyScalar(s);
                case 4:
                    return result.divideScalar(s);
            }
        }
        math3d.vectorScalarOp = vectorScalarOp;
    })(math3d = pxsim.math3d || (pxsim.math3d = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(geometry, material, id) {
            var _this = _super.call(this, new THREE.Mesh(geometry.reference, material.reference), id) || this;
            _this._rigidbody = null;
            _this._geometry = geometry;
            _this._material = material;
            _this._rigidbody = new pxsim.RigidBody(_this, _this.geometry, _this.geometry.volume * _this.material.density);
            return _this;
        }
        Object.defineProperty(Mesh.prototype, "geometry", {
            get: function () {
                return this._geometry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mesh.prototype, "material", {
            get: function () {
                return this._material;
            },
            enumerable: true,
            configurable: true
        });
        Mesh.prototype.enablePhysics = function (enable) {
            if (this._rigidbody) {
                this._rigidbody.setKinematicObject(!enable);
            }
        };
        Mesh.prototype.animate = function (timeStep) {
            _super.prototype.animate.call(this, timeStep);
            if (this._rigidbody) {
                this._rigidbody.syncMotionStateToObject3D();
            }
        };
        Mesh.prototype.onAdded = function (scene) {
            _super.prototype.onAdded.call(this, scene);
            if (this._rigidbody) {
                this._rigidbody.addRigidBody(scene.physicsWorld);
            }
        };
        Mesh.prototype.onRemoved = function (scene) {
            if (this._rigidbody) {
                this._rigidbody.removeRigidBody(scene.physicsWorld);
            }
            _super.prototype.onRemoved.call(this, scene);
        };
        Mesh.prototype._onDispose = function () {
            if (this._rigidbody) {
                this._rigidbody.dispose();
            }
            _super.prototype._onDispose.call(this);
        };
        return Mesh;
    }(pxsim.Object3D));
    pxsim.Mesh = Mesh;
    function isMesh(object) {
        return undefined !== object.geometry;
    }
    pxsim.isMesh = isMesh;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var mesh;
    (function (mesh_1) {
        function mesh(geometry, material) {
            return new pxsim.Mesh(geometry, material);
        }
        mesh_1.mesh = mesh;
    })(mesh = pxsim.mesh || (pxsim.mesh = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(id) {
            var _this = _super.call(this, new THREE.Scene(), id) || this;
            _this._physicsworld = new pxsim.PhysicsWorld();
            _this._ambientlight = new pxsim.AmbientLight();
            _this.reference.background = new THREE.Color(13882323);
            _this.add(_this._ambientlight);
            return _this;
        }
        Object.defineProperty(Scene.prototype, "physicsWorld", {
            get: function () {
                return this._physicsworld;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "ambientLight", {
            get: function () {
                return this._ambientlight;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.setBackgroundColor = function (color) {
            this.reference.background = color;
        };
        Scene.prototype.setAmbientLight = function (color) {
            this.ambientLight.reference.color = color;
        };
        Scene.prototype.addObject = function (object, position) {
            object.setPosition(position);
            this.add(object, true);
        };
        Scene.prototype.animate = function (timeStep) {
            _super.prototype.animate.call(this, timeStep);
            this._physicsworld.animate(timeStep);
            pxsim.WorldBoard.events.queue(1234, 5678, timeStep);
        };
        Scene.prototype.add = function (object, isRigidBody) {
            if (isRigidBody === void 0) { isRigidBody = false; }
            this.reference.add(object.reference);
            object.onAdded(this);
        };
        Scene.prototype.remove = function (object) {
            object.onRemoved(this);
            this.reference.remove(object.reference);
        };
        Scene.prototype._onDispose = function () {
            this._physicsworld.dispose();
            _super.prototype._onDispose.call(this);
        };
        return Scene;
    }(pxsim.Object3D));
    pxsim.Scene = Scene;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var scene;
    (function (scene) {
        function onAnimate(handler) {
            pxsim.WorldBoard.events.listen(1234, 5678, handler);
        }
        scene.onAnimate = onAnimate;
    })(scene = pxsim.scene || (pxsim.scene = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var World3D = (function (_super) {
        __extends(World3D, _super);
        function World3D(id) {
            if (id === void 0) { id = 'container'; }
            var _this = _super.call(this) || this;
            _this._controls = null;
            _this._onWindowResize = function () {
                _this._renderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
            };
            _this._onDocumentMouseMove = function (event) {
                event.preventDefault();
                var x = (event.clientX / window.innerWidth) * 2 - 1;
                var y = -(event.clientY / window.innerHeight) * 2 + 1;
                pxsim.console.log("(" + x + ", " + y + ")");
            };
            _this._renderer = new pxsim.Renderer(id);
            _this._renderer.currentScene = new pxsim.Scene('default');
            _this._renderer.activeCamera = new pxsim.PerspectiveCamera('main');
            _this._renderer.activeCamera.setPosition(new pxsim.Vector(-40, 20, 15));
            var container = document.getElementById(_this._renderer.id);
            if (container) {
                container.innerHTML = '';
                container.appendChild(_this._renderer.domElement);
            }
            _this._onWindowResize();
            window.addEventListener('resize', _this._onWindowResize, false);
            document.addEventListener('mousemove', _this._onDocumentMouseMove, false);
            _this._controls = new THREE.OrbitControls(_this._renderer.activeCamera.reference);
            _this._controls.target.set(0, 2, 0);
            _this._controls.update();
            return _this;
        }
        Object.defineProperty(World3D.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(World3D.prototype, "currentScene", {
            get: function () {
                return this._renderer.currentScene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(World3D.prototype, "activeCamera", {
            get: function () {
                return this._renderer.activeCamera;
            },
            enumerable: true,
            configurable: true
        });
        World3D.prototype._onDispose = function () {
            document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
            window.removeEventListener('resize', this._onWindowResize, false);
            var container = document.getElementById(this._renderer.id);
            if (container) {
                container.innerHTML = '';
            }
            this._renderer.currentScene.dispose();
            this._renderer.activeCamera.dispose();
            this._renderer.dispose();
        };
        return World3D;
    }(rt.ObjectDisposable));
    pxsim.World3D = World3D;
})(pxsim || (pxsim = {}));
(function (pxsim) {
    var world;
    (function (world) {
        function origin() {
            return pxsim.math3d.vector();
        }
        world.origin = origin;
        function currentScene() {
            return pxsim.currentScene();
        }
        world.currentScene = currentScene;
        function activeCamera() {
            return pxsim.activeCamera();
        }
        world.activeCamera = activeCamera;
    })(world = pxsim.world || (pxsim.world = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var WorldBoard = (function (_super) {
        __extends(WorldBoard, _super);
        function WorldBoard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._world = null;
            return _this;
        }
        Object.defineProperty(WorldBoard, "singleton", {
            get: function () {
                return this._board;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldBoard, "events", {
            get: function () {
                return this._events;
            },
            set: function (bus) {
                this._events = bus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WorldBoard.prototype, "world", {
            get: function () {
                return this._world;
            },
            enumerable: true,
            configurable: true
        });
        WorldBoard.prototype.initAsync = function (msg) {
            this.init();
            return Promise.resolve();
        };
        WorldBoard.prototype.init = function () {
            this.postkill();
            this._world = new pxsim.World3D();
        };
        WorldBoard.prototype.kill = function () {
            if (this._world) {
                this._world.renderer.pause = true;
            }
        };
        WorldBoard.prototype.postkill = function () {
            if (this._world) {
                this._world.dispose();
                this._world = null;
            }
        };
        WorldBoard.prototype.receiveMessage = function (msg) {
        };
        WorldBoard.prototype.updateView = function () {
        };
        WorldBoard._board = new WorldBoard();
        return WorldBoard;
    }(pxsim.BaseBoard));
    pxsim.WorldBoard = WorldBoard;
    pxsim.initCurrentRuntime = function (msg) {
        singletonWorldBoard().postkill();
        WorldBoard.events = new pxsim.EventBus(pxsim.runtime);
        return pxsim.runtime.board = singletonWorldBoard();
    };
    function singletonWorldBoard() { return WorldBoard.singleton; }
    pxsim.singletonWorldBoard = singletonWorldBoard;
    function currentWorld() { return singletonWorldBoard().world; }
    pxsim.currentWorld = currentWorld;
    function currentScene() { return currentWorld() ? currentWorld().currentScene : null; }
    pxsim.currentScene = currentScene;
    function activeCamera() { return currentWorld() ? currentWorld().activeCamera : null; }
    pxsim.activeCamera = activeCamera;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Helper = (function () {
        function Helper() {
        }
        Helper.btVector3FromThree = function (vec) {
            return new Ammo.btVector3(vec.x, vec.y, vec.z);
        };
        Helper.btQuaternionFromThree = function (qtr) {
            return new Ammo.btQuaternion(qtr.x, qtr.y, qtr.z, qtr.w);
        };
        Helper.safeAmmoDestroy = function (object) {
            if (object) {
                Ammo.destroy(object);
            }
        };
        return Helper;
    }());
    pxsim.Helper = Helper;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var PhysicsWorld = (function (_super) {
        __extends(PhysicsWorld, _super);
        function PhysicsWorld() {
            var _this = _super.call(this) || this;
            _this._btconfig = new Ammo.btDefaultCollisionConfiguration();
            _this._btdispatcher = new Ammo.btCollisionDispatcher(_this._btconfig);
            _this._btbroadphase = new Ammo.btDbvtBroadphase();
            _this._btconstraintsolver = new Ammo.btSequentialImpulseConstraintSolver();
            _this._btworld = new Ammo.btDiscreteDynamicsWorld(_this._btdispatcher, _this._btbroadphase, _this._btconstraintsolver, _this._btconfig);
            return _this;
        }
        Object.defineProperty(PhysicsWorld.prototype, "btWorld", {
            get: function () {
                return this._btworld;
            },
            enumerable: true,
            configurable: true
        });
        PhysicsWorld.prototype.getGravity = function () {
            return this._btworld.getGravity().y();
        };
        PhysicsWorld.prototype.setGravity = function (gravity) {
            var btvecGravity = new Ammo.btVector3(0, gravity, 0);
            this._btworld.setGravity(btvecGravity);
            pxsim.Helper.safeAmmoDestroy(btvecGravity);
        };
        PhysicsWorld.prototype.animate = function (timeStep) {
            this._btworld.stepSimulation(timeStep, 10);
        };
        PhysicsWorld.prototype._onDispose = function () {
            pxsim.Helper.safeAmmoDestroy(this._btworld);
            pxsim.Helper.safeAmmoDestroy(this._btconstraintsolver);
            pxsim.Helper.safeAmmoDestroy(this._btbroadphase);
            pxsim.Helper.safeAmmoDestroy(this._btdispatcher);
            pxsim.Helper.safeAmmoDestroy(this._btconfig);
        };
        return PhysicsWorld;
    }(rt.ObjectDisposable));
    pxsim.PhysicsWorld = PhysicsWorld;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var Renderer = (function (_super) {
        __extends(Renderer, _super);
        function Renderer(id) {
            if (id === void 0) { id = 'container'; }
            var _this = _super.call(this, Renderer._instantiateReference(id), id) || this;
            _this._domElement = document.createElement('div');
            _this._scene = null;
            _this._camera = null;
            _this._stats = new Stats();
            _this._clock = new THREE.Clock();
            _this._paused = false;
            _this._callbackRequestId = 0;
            _this._domElement.appendChild(_this.reference.domElement);
            _this._domElement.appendChild(_this._stats.dom);
            _this.reference.shadowMap.enabled = true;
            _this.reference.shadowMap.type = THREE.PCFSoftShadowMap;
            _this.reference.setClearColor(14745599);
            _this._runRenderLoop();
            return _this;
        }
        Renderer._instantiateReference = function (id) {
            var webglrenderer = Renderer._renderers.get(id);
            if (!webglrenderer) {
                Renderer._renderers.set(id, webglrenderer = new THREE.WebGLRenderer({ antialias: true }));
                webglrenderer.shadowMap.enabled = true;
                webglrenderer.shadowMap.type = THREE.PCFSoftShadowMap;
            }
            return webglrenderer;
        };
        Object.defineProperty(Renderer.prototype, "domElement", {
            get: function () {
                return this._domElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "currentScene", {
            get: function () {
                return this._scene;
            },
            set: function (scene) {
                this._scene = scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "activeCamera", {
            get: function () {
                return this._camera;
            },
            set: function (camera) {
                this._camera = camera;
                this._resizeCamera();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "isPaused", {
            get: function () {
                return this._paused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Renderer.prototype, "pause", {
            set: function (pause) {
                this._paused = pause;
            },
            enumerable: true,
            configurable: true
        });
        Renderer.prototype.animate = function () {
            if (this._scene) {
                this._scene.animate(this._clock.getDelta());
            }
        };
        Renderer.prototype.render = function () {
            if (this._scene && this._camera) {
                this.reference.render(this._scene.reference, this._camera.reference);
            }
        };
        Renderer.prototype.resize = function (width, height, devicePixelRatio) {
            this.reference.setPixelRatio(devicePixelRatio);
            this.reference.setSize(width, height);
            this._resizeCamera();
            this.render();
        };
        Renderer.prototype._onDispose = function () {
            this._stopRenderLoop();
        };
        Renderer.prototype._resizeCamera = function () {
            if (this._camera) {
                var size = this.reference.getSize();
                this._camera.resize(size.width, size.height);
            }
        };
        Renderer.prototype._runRenderLoop = function () {
            var _this = this;
            this._callbackRequestId = requestAnimationFrame(function (time) {
                if (!_this._paused) {
                    if (_this._stats) {
                        _this._stats.begin();
                    }
                    _this.animate();
                    _this.render();
                    if (_this._stats) {
                        _this._stats.end();
                    }
                }
                _this._runRenderLoop();
            });
        };
        Renderer.prototype._stopRenderLoop = function () {
            if (0 !== this._callbackRequestId) {
                cancelAnimationFrame(this._callbackRequestId);
                this._callbackRequestId = 0;
            }
        };
        Renderer._renderers = new Map();
        return Renderer;
    }(rt.WrappedObjectWithId));
    pxsim.Renderer = Renderer;
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    function btMotionStateFromObject3D(btmotionstate, object3d) {
        var bttransform = new Ammo.btTransform();
        var btorigin, btquarternion;
        bttransform.setOrigin(btorigin = pxsim.Helper.btVector3FromThree(object3d.reference.position));
        bttransform.setRotation(btquarternion = pxsim.Helper.btQuaternionFromThree(object3d.reference.quaternion));
        btmotionstate.setWorldTransform(bttransform);
        pxsim.Helper.safeAmmoDestroy(btquarternion);
        pxsim.Helper.safeAmmoDestroy(btorigin);
        pxsim.Helper.safeAmmoDestroy(bttransform);
        return btmotionstate;
    }
    pxsim.btMotionStateFromObject3D = btMotionStateFromObject3D;
    function btMotionStateToObject3D(btmotionstate, object3d) {
        var bttransform = new Ammo.btTransform();
        btmotionstate.getWorldTransform(bttransform);
        var btorigin = bttransform.getOrigin();
        var btrotation = bttransform.getRotation();
        object3d.reference.position.set(btorigin.x(), btorigin.y(), btorigin.z());
        object3d.reference.quaternion.set(btrotation.x(), btrotation.y(), btrotation.z(), btrotation.w());
        pxsim.Helper.safeAmmoDestroy(bttransform);
    }
    pxsim.btMotionStateToObject3D = btMotionStateToObject3D;
    var RigidBody = (function (_super) {
        __extends(RigidBody, _super);
        function RigidBody(object3d, geometry, mass) {
            var _this = _super.call(this) || this;
            _this._world = null;
            mass = Math.max(RigidBody.minMass, Math.min(RigidBody.maxMass, mass));
            var isDynamic = mass !== 0;
            var btmotionstate = new Ammo.btDefaultMotionState();
            var btshape = geometry.createCollisionShape();
            var btvecLocalInertia = new Ammo.btVector3(0, 0, 0);
            if (isDynamic) {
                btshape.calculateLocalInertia(mass, btvecLocalInertia);
            }
            var btinfo = new Ammo.btRigidBodyConstructionInfo(mass, btmotionstate, btshape, btvecLocalInertia);
            pxsim.Helper.safeAmmoDestroy(btvecLocalInertia);
            _this._btbody = new Ammo.btRigidBody(btinfo);
            _this._btshape = btshape;
            _this._btmotionstate = btmotionstate;
            _this._btinfo = btinfo;
            _this.setStaticObject(!isDynamic);
            _this.setKinematicObject(isDynamic);
            _this._object3d = object3d;
            return _this;
        }
        RigidBody.prototype.setStaticObject = function (isStatic) {
            this._toggleCollisionFlag(1, isStatic);
        };
        RigidBody.prototype.setKinematicObject = function (isKinematic) {
            this._toggleCollisionFlag(2, isKinematic);
            this._btbody.setActivationState(isKinematic ? 4 : 1);
            if (!isKinematic) {
                this._btbody.activate();
            }
            if (this._world) {
                this.addRigidBody(this._world);
            }
        };
        RigidBody.prototype.addRigidBody = function (world) {
            this.removeRigidBody(world);
            btMotionStateFromObject3D(this._btmotionstate, this._object3d);
            this._btbody.setMotionState(this._btmotionstate);
            this._world = world;
            this._world.btWorld.addRigidBody(this._btbody);
        };
        RigidBody.prototype.removeRigidBody = function (world) {
            if (this._world !== world) {
                return;
            }
            this._world.btWorld.removeRigidBody(this._btbody);
            this._world = null;
        };
        RigidBody.prototype.syncMotionStateToObject3D = function () {
            if (!this._btbody.isStaticOrKinematicObject()) {
                btMotionStateToObject3D(this._btbody.getMotionState(), this._object3d);
            }
        };
        RigidBody.prototype._toggleCollisionFlag = function (flag, on) {
            var flags = this._btbody.getCollisionFlags();
            if (on) {
                flags |= flag;
            }
            else {
                flags &= ~flag;
            }
            this._btbody.setCollisionFlags(flags);
        };
        RigidBody.prototype._onDispose = function () {
            pxsim.Helper.safeAmmoDestroy(this._btbody);
            pxsim.Helper.safeAmmoDestroy(this._btinfo);
            pxsim.Helper.safeAmmoDestroy(this._btmotionstate);
            pxsim.Helper.safeAmmoDestroy(this._btshape);
        };
        RigidBody.minMass = 0;
        RigidBody.maxMass = 100;
        return RigidBody;
    }(rt.ObjectDisposable));
    pxsim.RigidBody = RigidBody;
})(pxsim || (pxsim = {}));
