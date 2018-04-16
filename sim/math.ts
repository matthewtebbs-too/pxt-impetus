/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export class Vector extends THREE.Vector3 {
        public toString(): string {
            return `(${this.x}, ${this.y}, ${this.z})`;
        }
    }
}

namespace pxsim.math {
    export function degreesInRadians(degrees: number): number {
        return THREE.Math.degToRad(degrees);
    }

    export function radiansInDegrees(radians: number): number {
        return THREE.Math.radToDeg(radians);
    }
}

namespace pxsim.math3d {
    export function vector(x?: number, y?: number, z?: number): Vector  {
        return new Vector(x || 0, y || 0, z || 0);
    }

    export function zeroVector(): Vector  {
        return vector();
    }

    export function unitVector(): Vector  {
        return vector(1, 1, 1);
    }

    export function vectorOp(a: Vector, op: MathOp, b: Vector): Vector {
        const result: Vector = vector();

        switch (op) {
            case MathOp.Add:
                return result.addVectors(a, b) as Vector;

            case MathOp.Subtract:
                return result.subVectors(a, b) as Vector;

            case MathOp.Multiply:
                return result.multiplyVectors(a, b) as Vector;
        }

        // @ts-ignore
        throw new Error();
    }

    export function vectorScalarOp(a: Vector, op: MathOp, s: number): Vector {
        const result: Vector = a;

        switch (op) {
            case MathOp.Add:
                return result.addScalar(s) as Vector;

            case MathOp.Subtract:
                return result.subScalar(s) as Vector;

            case MathOp.Multiply:
                return result.multiplyScalar(s) as Vector;

            case MathOp.Divide:
                return result.divideScalar(s) as Vector;
        }
    }
}
