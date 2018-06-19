/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as THREE from 'three';

export * from 'three';

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
    prev: VertexNode;
    next: VertexNode;
    face: Face;

    userData: any;

    constructor(point: THREE.Vector3);
}

export class Face {
    normal: THREE.Vector3;
    midpoint: THREE.Vector3;
    area: number;
    constant: number;   
    outside: VertexNode;
    mark: number;
    edge: HalfEdge;

    constructor();

    create(a: VertexNode, b: VertexNode, c: VertexNode ): Face;
    getEdge(i: number): HalfEdge;
    compute(): Face;
    distanceToPoint(point: THREE.Vector3): number;
}

export class HalfEdge {
    vertex: VertexNode;
    prev: HalfEdge;
    next: HalfEdge;
    twin: HalfEdge;
    face: Face;

    constructor(vertext: VertexNode, face: Face);

    head(): VertexNode;
    tail(): VertexNode;
    length(): number;
    lengthSquared(): number;
    setTwin(edge: HalfEdge): HalfEdge;
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

