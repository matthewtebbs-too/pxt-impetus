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

    export function unitVector(): Vector  {
        return vector(1, 1, 1);
    }

    export function vectorOp(a: Vector, op: Op, b: Vector): Vector {
        const result: Vector = vector();

        switch (op) {
            case Op.Add:
                return result.addVectors(a, b);

            case Op.Subtract:
                return result.subVectors(a, b);

            case Op.Multiply:
                return result.multiplyVectors(a, b);
        }

        throw new Error();
    }

    export function vectorScalarOp(a: Vector, op: Op, s: number): Vector {
        const result: Vector = a;

        switch (op) {
            case Op.Add:
                return result.addScalar(s);

            case Op.Subtract:
                return result.subScalar(s);

            case Op.Multiply:
                return result.multiplyScalar(s);

            case Op.Divide:
                return result.divideScalar(s);
        }
    }
}
