/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="_runtime.ts"/>

namespace pxsim {
    export type Vector = THREE.Vector3;

    // tslint:disable-next-line:variable-name
    export const VectorConstructor = THREE.Vector3;

    export type Quaternion = THREE.Quaternion;

    // tslint:disable-next-line:variable-name
    export const QuaternionConstructor = THREE.Quaternion;
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
    export function vectorToString(v: Vector): string {
        return `(${v.x}, ${v.y}, ${v.z})`;
    }

    export function quaternionToString(q: Quaternion): string {
        return `(${q.x}, ${q.y}, ${q.z}, ${q.w})`;
    }

    export function vector(x: number, y: number, z: number): Vector  {
        return new VectorConstructor(x, y, z);
    }

    export function zeroVector(): Vector  {
        return vector(0, 0, 0);
    }

    export function unitVector(): Vector  {
        return vector(1, 1, 1);
    }

    export function vectorOp(a: Vector, op: MathOp, b: Vector): Vector {
        const result: Vector = zeroVector();

        switch (op) {
            case MathOp.Add:
                return result.addVectors(a, b);

            case MathOp.Subtract:
                return result.subVectors(a, b);

            case MathOp.Multiply:
                return result.multiplyVectors(a, b);
        }

        // @ts-ignore
        throw new Error();
    }

    export function vectorScalarOp(a: Vector, op: MathOp, s: number): Vector {
        const result: Vector = a;

        switch (op) {
            case MathOp.Add:
                return result.addScalar(s);

            case MathOp.Subtract:
                return result.subScalar(s);

            case MathOp.Multiply:
                return result.multiplyScalar(s);

            case MathOp.Divide:
                return result.divideScalar(s);
        }
    }

    export function quaternion(x: number, y: number, z: number, w: number): Quaternion  {
        return new QuaternionConstructor(x, y, z, w);
    }

    export function zeroQuaternion(): Quaternion  {
        return quaternion(0, 0, 0, 0);
    }
}
