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

//% blockNamespace=vector
declare class Vector {
    //% blockId=vector_x
    //% block="vector% x"
    //% shim=.x property
    readonly x: number;

    //% shim=.toString
    toString(): string;
}

//% blockNamespace=object
declare interface Object3d {
    /**
     * Look at.
     * @param position Vector
     */
    //% blockId=object3d_look_at
    //% block="%object3d|look at %position=math_vector"
    //% shim=.lookAt
    lookAt(position: Vector): void;
    
    /**
     * Set object position.
     * @param position Vector
     */
    //% blockId=object3d_set_position
    //% block="set %object3d position|at %position=math_vector"
    //% shim=.setPosition
    setPosition(position: Vector): void;

    /**
     * Set object rotation.
     * @param rotation Vector
     */
    //% blockId=object3d_set_rotation
    //% block="set %object3d rotation|to %rotation=math_unit_vector"
    //% shim=.setRotation
    setRotation(rotation: Vector): void;

    /**
     * Set object scale.
     * @param scale Vector
     */
    //% blockId=object3d_set_scale
    //% block="set %object3d scale|to %scale=math_unit_vector"
    //% shim=.setScale
    setScale(scale: Vector): void;

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
}

//%
declare class Color {
}

//%
declare interface Shape3d {
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

//% blockNamespace=design
declare interface Material {
    //% blockCombine
    //% blockCombineShadow=color_picker
    //% group="Material"
    //% shim=material::color property
    color: Color;

    //% blockCombine
    //% blockCombineShadow=color_picker
    //% group="Material"
    //% shim=material::emissive property
    emissive: Color;

    //% blockCombine
    //% group="Material"
    //% shim=material::roughness property
    roughness: number;

    //% blockCombine
    //% group="Material"
    //% shim=material::metalness property
    metalness: number;

    //% blockCombine
    //% group="Material"
    //% shim=material::density property
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
     * Create object with shape.
     */
    //% blockId=object3d_from_shape3d_and_material
    //% block="object with shape %shape=shape3d_box|and material %material=material_with_color"
    //% shim=mesh::fromShapeAndMaterial
    function fromShapeAndMaterial(shape3d: Shape3d, material: Material): Mesh3d;

    /**
     * 
     * Return material from the object, or null if it has none.
     */
    //% blockId=object3d_material_of
    //% block="material of %object3d"
    //% shim=mesh::materialOf
    function materialOf(object3d: Object3d): Material;
}

//%
declare interface Light extends Object3d {
}

//%
declare interface Camera extends Object3d {
}

//% color="#ffffff" icon="\uf030" block="Camera" weight=96
declare namespace camera { /* camera icon */
}

//%
declare interface Mesh3d extends Object3d {
}

//% blockNamespace=scene
declare interface Scene3d extends Object3d {
    /**
     * Active camera.
     */
    //% blockCombine
    //% blockCombineShadow=world_scene
    //% shim=scene::camera
    camera: Camera;

    /**
     * Origin.
     */
    //% blockCombine
    //% shim=scene::origin
    readonly origin: Vector;

    /**
     * Set background color.
     * @param color Color
     */
    //% blockId=set_background_color
    //% block="set %scene=world_scene|background %color=color_picker"
    //% shim=.setBackgroundColor
    setBackgroundColor(color: Color): void;

    /**
     * Set ambient light color.
     * @param color Color
     */
    //% blockId=set_ambientlight_color
    //% block="set %scene=world_scene|ambient light %color=color_picker"
    //% shim=.setAmbientLight
    setAmbientLight(color: Color): void;

    /**
     * Add object to scene.
     */
    //% blockId=add_object
    //% block="add to %scene=world_scene %object3d|at %position=world_origin"
    //% shim=.add
    add(object3d: Object3d, position: Vector): void;

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
     * Code to run when a mouse move occurs.
     */
    //% blockId=input_on_mousemove
    //% block="on mouse move"
    //% afterOnStart=true
    //% shim=input::onMouseMove
    function onMouseMove(cb: (x: number, y: number) => void): void;

    /**
     * Code to run when a mouse click occurs.
     */
    //% blockId=input_on_mouseclick
    //% block="on mouse %button click"
    //% afterOnStart=true
    //% shim=input::onMouseClick
    function onMouseClick(button: MouseButton, cb: (x: number, y: number) => void): void;
}
