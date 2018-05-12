/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='impetus.enums.d.ts'/>
/// <reference path='impetus.math.d.ts'/>

declare namespace fieldeditors {
    /**
     * Render a boolean as an on/off toggle.
     */
    //% blockId=fieldeditors_toggleOnOff
    //% block="%on"
    //% on.fieldEditor=toggleonoff
    //% on.fieldOptions.decompileLiterals=true
    //% shim=TD_ID blockHidden=1
    function onOff(on: boolean): boolean;
}

//% color="#80d926" icon="\uf01e" block="Loops"
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% blockId=loops_forever
    //% block="forever" weight=55
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds.
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% blockId=loops_pause_async
    //% block="pause (ms) %pause" weight=54
    //% shim=loops::pauseAsync
    function pauseAsync(ms: number): void;
}

//% color="#2699d9" icon="\uf074" block="Logic"
declare namespace logic {
}

//% blockNamespace=object
declare class Object3d {
    /**
     * Object position.
     */
    //% blockCombine
    //% blockCombineShadow=math_zero_vector
    //% shim=.position_ property
    position: Vector;

    /**
     * Object rotation.
     */
    //% blockCombine
    //% blockCombineShadow=math_zero_vector
    //% shim=.rotation_ property
    rotation: Vector;

    /**
     * Object quarternion.
     */
    //% blockCombine
    //% blockCombineShadow=math_zero_quaternion
    //% shim=.quaternion_ property
    //% advanced=true
    quaternion: Quaternion;

    /**
     * Object scale.
     */
    //% blockCombine
    //% blockCombineShadow=math_unit_vector
    //% shim=.scale_ property
    scale: Vector;

    /**
     * Rotate object by angle around axis.
     * @param axis Vector
     * @param angle number, eg: 0
     */
    //% blockId=object3d_set_rotation_from_axis_angle
    //% block="set %object3d rotation|around %axis=math_vector|by %angle"
    //% shim=.setRotationFromAxisAngle
    setRotationFromAxisAngle(axis: Vector, angle: number): void;

    /**
     * Enable/disable physics.
     * @param enabled is physics, e.g. gravity, enabled on this object?
     */
    //% blockId=object3d_set_physics_enabled
    //% block="set %object3d physics %enabled=fieldeditors_toggleOnOff"
    //% shim=.setPhysicsEnabled
    setPhysicsEnabled(enabled: boolean): void;

    /**
     * Look at.
     * @param position Vector
     */
    //% blockId=object3d_look_at
    //% block="%object3d|look at %position=math_vector"
    //% shim=.lookAtPosition
    lookAtPosition(position: Vector): void;
}

//%
declare class Color {
    //% group="Color"
    //% shim=color::colorToString
    toString(): string;
}

//%
declare class Shape3d {
}

//% color="#2680d9" icon="\uf1fc" block="Design" weight=100
declare namespace design { /* paint-brush icon */
}

declare namespace design {
    /**
     * Standard color.
     */
    //% blockId=color_standard
    //% block="%color"
    //% group="Color"
    //% shim=color::standardColor
    function standardColor(rgb: Palette): Color;

    /**
     * Random color.
     */
    //% blockId=color_random
    //% block="random color"
    //% group="Color"
    //% shim=color::randomColor
    function randomColor(): Color;

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255, eg: 255
     * @param green value of the green channel between 0 and 255, eg: 255
     * @param blue value of the blue channel between 0 and 255, eg: 255
     */
    //% blockId=color_from_rgb
    //% block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% group="Color"
    //% shim=color::colorFromRgb
    function colorFromRgb(red: number, green: number, blue: number): Color;

    /**
     * Convert an HSV (hue, saturation, value) color to RGB
     * @param hue value of the hue channel between 0 and 255, eg: 255
     * @param sat value of the saturation channel between 0 and 255, eg: 255
     * @param val value of the value channel between 0 and 255, eg: 255
     */
    //% blockId=color_from_hsv
    //% block="hue %hue|sat %sat|val %val"
    //% hue.min=0 hue.max=255 sat.min=0 sat.max=255 val.min=0 val.max=255
    //% group="Color"
    //% shim=color::colorFromHsv
    function colorFromHsv(hue: number, sat: number, val: number): Color;

    /**
     * Pick color from slider.
     * @param color color, eg: 0xffffff
     */
    //% blockId=color_wheel
    //% block="%color"
    //% colorSecondary="#FFFFFF"
    //% color.fieldEditor="colorwheel"
    //% color.fieldOptions.decompileLiterals=true
    //% blockHidden=true
    //% shim=color::colorWheel
    function colorWheel(color: number): Color;

    /**
     * Pick color from list.
     * @param color color, eg: 0xffffff
     */
    //% blockId=color_picker
    //% block="%color"
    //% colorSecondary="#FFFFFF"
    //% color.fieldEditor="colornumber"
    //% color.fieldOptions.decompileLiterals=true
    //% blockHidden=true
    //% shim=color::colorPicker
    function colorPicker(color: number): Color;    
}

declare namespace design {
    /**
     * Plane shape.
     * @param width number, eg: 100
     * @param height number, eg: 100
     */
    //% blockId=shape3d_plane
    //% block="plane of width %radius|height %height"
    //% group="Shape"
    //% shim=shape::planeShape
    function planeShape(width?: number, height?: number): Shape3d;

    /**
     * Box shape.
     * @param width number, eg: 1
     * @param height number, eg: 1
     * @param depth number, eg: 1
     */
    //% blockId=shape3d_box
    //% block="box of width %width|height %height|depth %depth"
    //% group="Shape"
    //% shim=shape::boxShape
    function boxShape(width?: number, height?: number, depth?: number): Shape3d;

    /**
     * Cylinder shape.
     * @param radius number, eg: 0.5
     * @param height number, eg: 1
     */
    //% blockId=shape3d_cylinder 
    //% block="cylinder of radius %radius|height %height"
    //% group="Shape"
    //% shim=shape::cylinderShape
    function cylinderShape(radius?: number, height?: number): Shape3d;

    /**
     * Sphere shape.
     * @param radius number, eg: 0.5
     */
    //% blockId=shape3d_sphere 
    //% block="sphere of radius %radius"
    //% group="Shape"
    //% shim=shape::sphereShape
    function sphereShape(radius?: number): Shape3d;

    /**
     * Cone shape.
     * @param radius number, eg: 0.5
     * @param height number, eg: 1
     */
    //% blockId=shape3d_cone 
    //% block="cone of radius %radius|height %height"
    //% group="Shape"
    //% shim=shape::coneShape
    function coneShape(radius?: number, height?: number): Shape3d;

    /**
     * Polyhedron shape.
     * @param radius number, eg: 0.5
     */
    //% blockId=shape3d_polyhedron
    //% block="%polyhedron|of radius %radius"
    //% group="Shape"
    //% shim=shape::polyhedronShape
    function polyhedronShape(polyhedron: Polyhedron, radius?: number): Shape3d;

    /**
     * Torus shape.
     * @param radius number, eg: 0.5
     * @param tube number, eg: 0.2
     */
    //% blockId=shape3d_torus
    //% block="%torus|of radius %radius|and tube %tube"
    //% group="Shape"
    //% shim=shape::torusShape
    function torusShape(torus: Torus, radius?: number, tube?: number): Shape3d;

    /**
     * Utah teapot.
     * @param size number, eg: 1
     */
    //% blockId=shape3d_teapot 
    //% block="teapot of size %size"
    //% group="Shape"
    //% shim=shape::teapotShape
    function teapotShape(size?: number): Shape3d;
}

declare namespace design {
    /**
     * Directional light.
     * @param color Color
     * @param intensity number, eg: 1
     */
    //% blockId=light_directional
    //% block="%color=color_picker directional light|with %intensity intensity"
    //% group="Light"
    //% shim=light::directionalLight
    function directionalLight(color?: Color, intensity?: number): Light;
}

//% blockNamespace=design
declare class Material {
    //% blockCombine
    //% blockCombineShadow=color_picker
    //% group="Material"
    //% shim=.color property
    color: Color;

    //% blockCombine
    //% blockCombineShadow=color_picker
    //% group="Material"
    //% shim=.emissive property
    emissive: Color;

    //% blockCombine
    //% group="Material"
    //% shim=.roughness property
    roughness: number;

    //% blockCombine
    //% group="Material"
    //% shim=.metalness property
    metalness: number;

    //% blockCombine
    //% group="Material"
    //% shim=.density property
    density: number;
}

declare namespace design {
    /**
     * Solid color material.
     * @param color Color
     */
    //% blockId=material_of_color
    //% block="%color=color_picker material"
    //% group="Material"
    //% shim=material::materialOfColor
    function materialOfColor(color?: Color): Material;
}

//% color="#7f26d9" icon="\uf1b2" block="Object" weight=99
declare namespace object { /* cube icon */
    /**
     * 
     * Return material from the object, or null if it has none.
     */
    //% blockId=object3d_material_of
    //% block="material of %object3d"
    //% shim=mesh::materialOf
    function materialOf(object3d: Object3d): Material;

    /**
     * Create object with shape.
     */
    //% blockId=object3d_from_shape3d_and_material
    //% block="object with shape %shape=shape3d_box|and material %material=material_of_color"
    //% shim=mesh::fromShapeAndMaterial
    function fromShapeAndMaterial(shape3d: Shape3d, material: Material): Mesh3d;
}

//%
declare class Light extends Object3d {
}

//%
declare class Camera extends Object3d {
    /**
     * Attach camera controller.
     * @param type value, eg: CameraController.Orbit
     */
    //% blockId=camera_attachcontroller
    //% block="attach %type controller"
    //% group="Camera"
    //% shim=.attachController
    attachController(type: CameraController): void;
}

declare namespace design {
    /**
     * Perspective camera.
     */
    //% blockId=camera_perspective
    //% block="perspective camera"
    //% group="Camera"
    //% shim=camera::perspectiveCamera
    function perspectiveCamera(): Camera;
}

//%
declare class Mesh3d extends Object3d {
}

//% blockNamespace=scene
declare class Scene3d extends Object3d {
    /**
     * Active camera.
     */
    //% blockCombine
    //% blockCombineShadow=world_scene,camera_perspective
    //% shim=.camera property
    camera: Camera;

    /**
     * Background color.
     */
    //% blockCombine
    //% blockCombineShadow=world_scene,color_picker
    //% shim=.backgroundColor property
    backgroundColor: Color;

    /**
     * Ambient light color.
     */
    //% blockCombine
    //% blockCombineShadow=world_scene,color_picker
    //% shim=.ambientColor property
    ambientColor: Color;

    /**
     * Add object to scene.
     */
    //% blockId=add_object
    //% block="add to %scene=world_scene %object3d|at %position=math_zero_vector"
    //% shim=.addAt
    addAt(object3d: Object3d, position: Vector): void;

    /**
     * Remove object from scene.
     */
    //% blockId=remove_object
    //% block="remove from %scene=world_scene %object3d"
    //% shim=.remove
    remove(object3d: Object3d): void;
}

//% color="#d92680" icon="\uf03e" block="Scene" weight=95
declare namespace scene { /* image icon */
    /**
     * Random position on plane.
     * @param size value, eg: 1
     */
    //% blockId=scene_random_positiononplane
    //% block="random position on %size size plane"
    //% shim=scene::randomPositionOnPlane
    function randomPositionOnPlane(size: number): Vector;

     /**
     * Random position in sphere.
     * @param diameter value, eg: 1
     */
    //% blockId=scene_random_positioninsphere
    //% block="random position in %side diameter sphere"
    //% shim=scene::randomPositionInSphere
    function randomPositionInSphere(diameter: number): Vector;

    /**
     * Random position in cube.
     * @param size value, eg: 1
     */
    //% blockId=scene_random_positionincube
    //% block="random position in %size size cube"
    //% shim=scene::randomPositionInCube
    function randomPositionInCube(size: number): Vector;

    /**
     * Intersect the view of the current scene with the active camera.
     */
    //% blockId=scene_intersect_objectat
    //% block="intersected object at %x|%y"
    //% shim=scene::intersectedObjectAt
    function intersectedObjectAt(x: number, y: number): Object3d | null;

    /**
     * Code to run when the scene is animated before each frame.
     */
    //% blockId=scene_on_animate
    //% block="on scene animate"
    //% afterOnStart=true
    //% shim=scene::onAnimate
    function onAnimate(cb: (msec: number) => void): void;
}

//% color="#d92626" icon="\uf0ac" block="World" weight=94
declare namespace world { /* globe icon */
    /**
     * Get current scene.
     */
    //% blockId=world_scene
    //% block="scene"
    //% shim=world::scene
    function scene(): Scene3d;
}

//% color="#B4009E" icon="\uf192" block="Input" weight=93
declare namespace input { /* dot-circle icon */
    /**
     * Code to run when a key event occurs.
     */
    //% blockId=input_on_key_event
    //% block="on %key key|%event"
    //% afterOnStart=true
    //% shim=input::onKeyEvent
    function onKeyEvent(key: string, event: KeyEvent, cb: () => void): void;

    /**
     * Code to run when a mouse enter occurs.
     */
    //% blockId=input_on_mouse_enter
    //% block="on mouse enter"
    //% afterOnStart=true
    //% shim=input::onMouseEnter
    function onMouseEnter(cb: () => void): void;

    /**
     * Code to run when a mouse move occurs.
     */
    //% blockId=input_on_mouse_move
    //% block="on mouse move"
    //% afterOnStart=true
    //% shim=input::onMouseMove
    function onMouseMove(cb: (x: number, y: number) => void): void;

    /**
     * Code to run when a mouse leave occurs.
     */
    //% blockId=input_on_mouse_leave
    //% block="on mouse leave"
    //% afterOnStart=true
    //% shim=input::onMouseLeave
    function onMouseLeave(cb: () => void): void;

    /**
     * Code to run when a mouse click occurs.
     */
    //% blockId=input_on_mouse_buttonevent
    //% block="on mouse %button button|%event"
    //% afterOnStart=true
    //% shim=input::onMouseButtonEvent
    function onMouseButtonEvent(button: MouseButton, event: MouseButtonEvent, cb: (x: number, y: number) => void): void;
}
