
/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

export namespace ColorConverter {
    // tslint:disable-next-line:interface-name
    export interface HSV {
        h: number;
        s: number;
        v: number;
    }

    // tslint:disable-next-line:interface-name
    export interface CMYK {
        c: number;
        m: number;
        y: number;
        k: number;
    }

    export function setHSV(color: THREE.Color, h: number, s: number, v: number): THREE.Color;
    export function getHSV(color: THREE.Color):HSV;
    export function setCMYK(color: THREE.Color, c: number, m: number, y: number, k: number): THREE.Color;
    export function getCMYK(color: THREE.Color): CMYK;
}

export class ConvexGeometry extends THREE.Geometry {
    constructor(points: THREE.Vector3[]);
}

export class ConvexBufferGeometry extends THREE.BufferGeometry {
    constructor(points: THREE.Vector3[]);
}

export namespace Detector {
    export const webgl: boolean;
    export function getWebGLErrorMessage(): HTMLElement;
    export function addGetWebGLMessage(parameters?: {id?: string; parent?: HTMLElement}): void;
}

export class VertexNode {
    point: THREE.Vector3;
}

export class Face {
    edge: HalfEdge;
}

export class HalfEdge {
    next: HalfEdge;

    constructor(vertext: VertexNode, face: Face);

    head(): VertexNode;
}


export class QuickHull {
    tolerance: number;
    faces: Array<Face>;

    constructor();

    setFromPoints(points: Array<THREE.Vector3>): this;
    setFromObject(object: THREE.Object3D): this;

    makeEmpty(): this;
    compute(): this;
    cleanup(): this;
}

export class TeapotBufferGeometry extends THREE.BufferGeometry {
    constructor(size?: number, segments?: number, bottom?: boolean, lid?: boolean, body?: boolean, fitLid?: boolean, blinn?: boolean);
}

export as namespace THREEX;
