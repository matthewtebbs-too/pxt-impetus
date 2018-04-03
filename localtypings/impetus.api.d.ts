/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='impetus.enums.d.ts'/>

declare namespace fieldeditors {
    /**
     * Render a boolean as a on/off toggle.
     */
    //% blockId=fieldeditors_toggleOnOff
    //% block="%on"
    //% on.fieldEditor=toggleonoff
    //% on.fieldOptions.decompileLiterals=true
    //% shim=TD_ID blockHidden=1
    function onOff(on: boolean): boolean;
}

//@ts-ignore
//% color="#002050" icon="\uf120" block="Console" weight=0
//% advanced=true
declare namespace console {
    /**
     * Write a line of text to the console output.
     * @param value to send
     */
    //% blockId=console_log
    //% block="console|log %text" weight=90
    //% text.shadowOptions.toString=true
    //% shim=console::log
    function log(text: string): void;

    /**
     * Write a name:value pair as a line of text to the console output.
     * @param name of the value, eg: "x"
     * @param value to write
     */
    //% blockId=console_log_value
    //% block="console|log value %name|= %value" weight=88 blockGap=8
    //% value.shadowOptions.toString=true
    //% shim=console::logValue
    function logValue(name: string, value: string): void;
}

//% color="#80d926" icon="\uf01e" block="Loops"
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% blockId=loops_forever
    //% block="forever" weight=55 blockGap=8
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

//% color="#2699d9" icon="\uf074" block="Loops"
declare namespace logic {
}

//%
declare class Vector {
    //% shim=.toString
    public toString(): string;
}

//@ts-ignore
//% color="#9966ff" icon="\uf1ec" block="3D Math"
declare namespace math3d {
    /**
     * Create vector.
     * @param x value, eg: 0
     * @param y value, eg: 0
     * @param z value, eg: 0
     */
    //% blockId="math_vector"
    //% block="X %x|Y %y|Z %z"
    //% group="Vector"
    //% shim=math3d::vector
    function vector(x?: number, y?: number, z?: number): Vector;

    /**
     * Unit vector.
     */
    //% blockId="math_unit_vector"
    //% block="unit vector"
    //% group="Vector"
    //% shim=math3d::unitVector
    function unitVector(): Vector;

    /**
     * Vector operations.
     * @param a vector operand
     * @param op vector operation
     * @param b vector operand
     */
    //% blockId="math_vector_op"
    //% block="%a=math_unit_vector|%op|%b=math_unit_vector"
    //% group="Vector"
    //% shim=math3d::vectorOp
    function vectorOp(a: Vector, op: Op, b: Vector): Vector;

    /**
     * Vector scalar operations.
     * @param a vector operand
     * @param op scalar operation
     * @param s scalar operand, eg: 0
     */
    //% blockId="math_vector_scalar_op"
    //% block="%a=math_unit_vector|%op|scalar %s"
    //% group="Vector"
    //% shim=math3d::vectorScalarOp
    function vectorScalarOp(a: Vector, op: Op, s: number): Vector;

    /**
     * Convert degress to radians.
     * @param degrees number, e.g. 0
     */
    //% blockId="math_deg_to_rad"
    //% block="%degrees degrees in radians"
    //% shim=math::degreesInRadians
    //% advanced=true
    function degreesInRadians(degrees: number): number;

    /**
     * Convert radians to degrees.
     * @param radians number, e.g. 0
     */
    //% blockId="math_rad_to_deg"
    //% block="%radians radians in degrees"
    //% shim=math::radiansInDegrees
    //% advanced=true
    function radiansInDegrees(radians: number): number;
}

//%
declare class Object3d {
    /**
     * Look at.
     * @param position Vector
     */
    //% blockId=object3d_look_at
    //% block="%object3d=world_active_camera|look at %position=math_vector"
    //% shim=.lookAt
    public lookAt(position: Vector): void;
    
    /**
     * Set object position.
     * @param position Vector
     */
    //% blockId=object3d_set_position
    //% block="set %object3d position|at %position=math_vector"
    //% shim=.setPosition
    public setPosition(position: Vector): void;

    /**
     * Set object rotation.
     * @param rotation Vector
     */
    //% blockId=object3d_set_rotation
    //% block="set %object3d rotation|to %rotation=math_unit_vector"
    //% shim=.setRotation
    public setRotation(rotation: Vector): void;

    /**
     * Set object scale.
     * @param scale Vector
     */
    //% blockId=object3d_set_scale
    //% block="set %object3d scale|to %scale=math_unit_vector"
    //% shim=.setScale
    public setScale(scale: Vector): void;

    /**
     * Rotate object by angle around axis.
     * @param axis Vector
     * @param angle number, eg: 0
     */
    //% blockId=object3d_set_rotation_from_axis_angle
    //% block="set %object3d rotation|around %axis=math_vector|by %angle"
    //% shim=.setRotationFromAxisAngle
    public setRotationFromAxisAngle(axis: Vector, angle: number): void;

    /**
     * Enable/disable physics.
     * @param enabled is physics, e.g. gravity, enabled on this object?
     */
    //% blockId=object3d_set_physics_enabled
    //% block="set %object physics %enabled=fieldeditors_toggleOnOff"
    //% shim=.setPhysicsEnabled
    public setPhysicsEnabled(enabled: boolean): void;
}

//%
declare class Color {
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
    //% shim=shape3d::planeShape
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
    //% shim=shape3d::boxShape
    function boxShape(width?: number, height?: number, depth?: number): Shape3d;

    /**
     * Cylinder shape.
     * @param radius number, eg: 0.5
     * @param height number, eg: 1
     */
    //% blockId=shape3d_cylinder 
    //% block="cylinder of radius %radius|height %height"
    //% group="Shape"
    //% shim=shape3d::cylinderShape
    function cylinderShape(radius?: number, height?: number): Shape3d;

    /**
     * Sphere shape.
     * @param radius number, eg: 0.5
     */
    //% blockId=shape3d_sphere 
    //% block="sphere of radius %radius"
    //% group="Shape"
    //% shim=shape3d::sphereShape
    function sphereShape(radius?: number): Shape3d;

    /**
     * Cone shape.
     * @param radius number, eg: 0.5
     * @param height number, eg: 1
     */
    //% blockId=shape3d_cone 
    //% block="cone of radius %radius|height %height"
    //% group="Shape"
    //% shim=shape3d::coneShape
    function coneShape(radius?: number, height?: number): Shape3d;
}

//%
declare class Light extends Object3d {
}

declare namespace design {
    /**
     * Directional light.
     * @param color Color
     * @param intensity number, eg: 1
     */
    //% blockId=light_directional
    //% block="%color=color_picker directional light|with intensity %intensity"
    //% group="Light"
    //% shim=light::directionalLight
    function directionalLight(color?: Color, intensity?: number): Light;
}

//%
declare class Material {
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

//%
declare class Camera extends Object3d {
}

//% color="#ffffff" icon="\uf030" block="Camera" weight=96
declare namespace camera { /* camera icon */
}

//%
declare class Mesh extends Object3d {
}

//% color="#7f26d9" icon="\uf1b2" block="Object" weight=99
declare namespace object3d { /* cube icon */
    /**
     * Create object with shape.
     */
    //% blockId=object3d_from_shape3d_and_material
    //% block="object with shape %shape=shape3d_box|and material %material=material_with_color"
    //% shim=mesh::fromShapeAndMaterial
    function fromShapeAndMaterial(shape3d: Shape3d, material: Material): Mesh;
}

//%
declare class Scene extends Object3d {
    /**
     * Set background color.
     * @param color Color
     */
    //% blockId=set_background_color
    //% block="set %current=world_scene|background %color=color_picker"
    //% shim=.setBackgroundColor
    public setBackgroundColor(color: Color): void;

    /**
     * Set ambient light color.
     * @param color Color
     */
    //% blockId=set_ambientlight_color
    //% block="set %current=world_scene|ambient light %color=color_picker"
    //% shim=.setAmbientLight
    public setAmbientLight(color: Color): void;

    /**
     * Add object to scene.
     */
    //% blockId=add_object
    //% block="add to %scene=world_scene %object3d|at %position=world_origin"
    //% shim=.add
    public add(object3d: Object3d, position: Vector): void;

    /**
     * Remove object from scene.
     */
    //% blockId=remove_object
    //% block="remove from %scene=world_scene %object3d"
    //% shim=.remove
    public remove(object3d: Object3d): void;
}

//% color="#d92680" icon="\uf03e" block="Scene" weight=95
declare namespace scene { /* image icon */
    /**
     * Code to run when the scene is animated before each frame.
     */
    //% blockId=scene_on_animate
    //% block="on animate"
    //% shim=scene::onAnimate
    function onAnimate(cb: (msec: number) => void): void;
}

//% color="#d92626" icon="\uf0ac" block="World" weight=94
declare namespace world3d { /* globe icon */
    /**
     * Origin vector.
     */
    //% blockId=world_origin
    //% block="origin"
    //% shim=world3d::origin
    function origin(): Vector;

    /**
     * Get current scene.
     */
    //% blockId=world_scene
    //% block="scene"
    //% shim=world3d::scene
    function scene(): Scene;

    /**
     * Get active camera.
     */
    //% blockId=world_camera
    //% block="camera"
    //% shim=world3d::camera
    function camera(): Camera;

    /**
     * Intersect the view of the current scene with the active camera.
     */
    //% blockId=world_intersect_objectat
    //% block="intersected object at %x|%y"
    //% shim=world3d::intersectedObjectAt
    function intersectedObjectAt(x: number, y: number): Object3d | null;


    /**
     * Code to run when the mouse is moved over the world's render window.
     */
    //% blockId=world_on_mousemove
    //% block="on mouse move"
    //% shim=world3d::onMouseMove
    function onMouseMove(cb: (x: number, y: number) => void): void;
}
