/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

//@ts-ignore
declare namespace Math {
    /**
     * Create vector.
     * @param x value, eg: 0
     * @param y value, eg: 0
     * @param z value, eg: 0
     */
    //% blockId=math_vector
    //% block="X %x|Y %y|Z %z"
    //% group="Vector"
    //% shim=math3d::vector
    function vector(x?: number, y?: number, z?: number): Vector;

    /**
     * Zero vector.
     */
    //% blockId=math_zero_vector
    //% block="zero vector"
    //% group="Vector"
    //% shim=math3d::zeroVector
    function zeroVector(): Vector;

    /**
     * Unit vector.
     */
    //% blockId=math_unit_vector
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
    //% blockId=math_vector_op
    //% block="%a=math_unit_vector|%op|%b=math_unit_vector"
    //% group="Vector"
    //% shim=math3d::vectorOp
    function vectorOp(a: Vector, op: MathOp, b: Vector): Vector;

    /**
     * Vector scalar operations.
     * @param a vector operand
     * @param op scalar operation
     * @param s scalar operand, eg: 0
     */
    //% blockId=math_vector_scalar_op
    //% block="%a=math_unit_vector|%op|scalar %s"
    //% group="Vector"
    //% shim=math3d::vectorScalarOp
    function vectorScalarOp(a: Vector, op: MathOp, s: number): Vector;

    /**
     * Convert degress to radians.
     * @param degrees number, e.g. 0
     */
    //% blockId=math_deg_to_rad
    //% block="%degrees degrees in radians"
    //% shim=math::degreesInRadians
    //% advanced=true
    function degreesInRadians(degrees: number): number;

    /**
     * Convert radians to degrees.
     * @param radians number, e.g. 0
     */
    //% blockId=math_rad_to_deg
    //% block="%radians radians in degrees"
    //% shim=math::radiansInDegrees
    //% advanced=true
    function radiansInDegrees(radians: number): number;
}