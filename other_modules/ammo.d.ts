/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

export class btVector3 {
    constructor();
    constructor(x: number, y: number, z: number);

    x(): number;
    y(): number;
    z(): number;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;

    setValue(x: number, y: number, z: number, w?: number): void;

    length(): number;
    normalize(): void;

    rotate(axis: btVector3, angle: number): void;
    dot(v: btVector3): number;

    op_mul(x: number): this;
    op_add(v: btVector3): this;
    op_sub(v: btVector3): this;
}

export class btVector4 extends btVector3 {
    constructor(x: number, y: number, z: number, w: number);

    w(): number;
    setW(w: number): void;
}

export class btQuadWord {
    constructor();
    constructor(x: number, y: number, z: number, w?: number);

    x(): number;
    y(): number;
    z(): number;
    w(): number;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    setW(w: number): void;

    setValue(x: number, y: number, z: number, w: number): void;
}

export class btQuaternion extends btQuadWord {
    length(): number;
    length2(): number;
    normalize(): void;

    dot(q: btQuaternion): number;

    normalized(): btQuaternion;
    getAxis(): btVector3;
    inverse(): btQuaternion;

    getAngle(): number;
    getAngleShortestPath(): number;
    angle(q: btQuaternion): number;
    angleShortestPath(q: btQuaternion): number;

    setEulerZYX(z: number, y: number, x: number): void;
    setRotation(axis: btVector3, angle: number): void;

    op_add(q: btQuaternion): this;
    op_sub(q: btQuaternion): this;
    op_mul(s: number): this;
    op_mulq(q: btQuaternion): this;
    op_div(s: number): this;
}

export class btMatrix3x3 {
    setEulerZYX(z: number, y: number, x: number): void;
    getRotation(q: btQuaternion): void;
    getRow(y:number): btVector3;
}

export class btTransform {
    constructor();
    constructor(q: btQuaternion, v: btVector3);
  
    setIdentity(): void;

    getOrigin(): btVector3;
    setOrigin(origin: btVector3): void;
    getRotation(): btQuaternion;
    setRotation(rotation: btQuaternion): void;

    getBasis(): btMatrix3x3;
    setFromOpenGLMatrix(m: number[]): void;
}

export abstract class btMotionState {
    getWorldTransform(worldTrans: btTransform): void;
    setWorldTransform(worldTrans: btTransform): void;
}

export class btDefaultMotionState extends btMotionState {
    constructor(startTrans?: btTransform, centerOfMassOffset?: btTransform);

    m_graphicsWorldTrans: btTransform;
}

declare const enum CollisionFlags {
    CF_STATIC_OBJECT = 1,
    CF_KINEMATIC_OBJECT = 2,
    CF_NO_CONTACT_RESPONSE = 4,
    CF_CUSTOM_MATERIAL_CALLBACK = 8,
    CF_CHARACTER_OBJECT = 16,
    CF_DISABLE_VISUALIZE_OBJECT = 32,
    CF_DISABLE_SPU_COLLISION_PROCESSING = 64 
}

declare const enum ActivationState {
    ACTIVE_TAG = 1,
    ISLAND_SLEEPING = 2,
    WANTS_DEACTIVATION = 3,
    DISABLE_DEACTIVATION = 4,
    DISABLE_SIMULATION = 5
}

export abstract class btCollisionObject {
    setActivationState(newState: ActivationState): void;
    forceActivationState(newState: ActivationState): void;
    activate(forceActivation?: boolean): void;

    isActive(): boolean;
    isKinematicObject(): boolean;
    isStaticObject(): boolean;
    isStaticOrKinematicObject(): boolean;

    setAnisotropicFriction(anisotropicFriction: btVector3, frictionMode: number): void;

    getCollisionFlags(): CollisionFlags;
    setCollisionFlags(flags: CollisionFlags): void;
    getCollisionShape(): btCollisionShape;
    setCollisionShape(collisionShape: btCollisionShape): void;

    setContactProcessingThreshold(contactProcessingThreshold: number): void;
    setRestitution(rest: number): void;
    setFriction(friction: number): void;
    setRollingFriction(friction: number): void;

    gtWorldTransform(): btTransform;
    setWorldTransform(worldTrans: btTransform): void;

    setCcdMotionThreshold(ccdMotionThreshold: number): void;
    setCcdSweptSphereRadius(radius: number): void;
    
    getUserIndex(): number;
    setUserIndex(lindex: number): void;
    getUserPointer(): any;
    setUserPointer(userPointer: any): void;
}

export abstract class btCollisionShape {
    getLocalScaling(): btVector3;
    setLocalScaling(scaling: btVector3): void;
    getMargin(): number;
    setMargin(margin: number): void;

    calculateLocalInertia(mass:number, inertia: btVector3): void;
}

export class btCompoundShape extends btCollisionShape {
    constructor(enableDynamicAabbTree?: boolean);

    getNumChildShapes(): number;
    getChildShape(index:number): btCollisionShape;

    addChildShape(localTransform: btTransform, shape: btCollisionShape): void;
    removeChildShapeByIndex(childShapeindex: number): void;
}

export abstract class btConcaveShape extends btCollisionShape {
}

export class btStaticPlaneShape extends btConcaveShape {
    constructor(planeNormal: btVector3, planeConstant: number);
}

export abstract class btConvexShape extends btCollisionShape {
}

export class btBoxShape extends btConvexShape {
    constructor(boxHalfExtents: btVector3);
}

export class btCapsuleShape extends btConvexShape {
    constructor(radius: number, height: number);

    getUpAxis(): number;
    getRadius(): number;
    getHalfHeight(): number;
}

export class btCapsuleShapeX extends btCapsuleShape {}

export class btCapsuleShapeZ extends btCapsuleShape {}

export class btCylinderShape extends btConvexShape {
    constructor(halfExtents: btVector3);
}

export class btCylinderShapeX extends btCylinderShape {}

export class btCylinderShapeZ extends btCylinderShape {}

export class btSphereShape extends btConvexShape {
    constructor(radius: number);
}

export class btConeShape extends btConvexShape {
    constructor(radius: number, height: number);
}

export class btConeShapeX extends btConeShape {}

export class btConeShapeZ extends btConeShape {}

export class btConvexHullShape extends btConvexShape {
    addPoint(point: btVector3, recalculateLocalAABB?: boolean): void;

    getMargin(): number;
    setMargin(margin: number): void;
}

export abstract class btOverlappingPairCallback {
}

export abstract class btOverlappingPairCache extends btOverlappingPairCallback {
    setInternalGhostPairCallback(ghostPairCallback: btOverlappingPairCallback): void;
}

export abstract class btBroadphaseInterface {
}

export class btDbvtBroadphase extends btBroadphaseInterface {
    constructor(paircache?: btOverlappingPairCache);
}

export class btCollisionConfiguration {
}

export class btDefaultCollisionConfiguration extends btCollisionConfiguration {
}

export abstract class btDispatcher {
}

export class btDispatcherInfo {
    m_timeStep: number;
    m_stepCount: number;
    m_dispatchFunc: number;
    m_timeOfImpact: number;
    m_useContinuous: boolean;
    m_enableSatConvex: boolean;
    m_enableSPU: boolean;
    m_useEpa: boolean;
    m_allowedCcdPenetration: number;
    m_useConvexConservativeDistanceUtil: boolean;
    m_convexConservativeDistanceThreshold: number;
}

export class btCollisionDispatcher extends btDispatcher {    
    constructor(config: btCollisionConfiguration);
}

export abstract class btTypedConstraint {    
    getParam(num: number, axis: number): number;
    setParam(num: number, value: number, axis: number): void;

    enableFeedback(needsFeedback: boolean): void;

    getBreakingImpulseThreshold(): number;
    setBreakingImpulseThreshold(threshold: number): void;
}

export abstract class btConstraintSolver {
}

export class btSequentialImpulseConstraintSolver extends btConstraintSolver {
}

export class btCollisionWorld {
    constructor(
        dispatcher: btDispatcher,
        broadphase: btBroadphaseInterface,
        collisionconfig: btCollisionConfiguration
    );

    getDispatcher(): btDispatcher;
    getBroadphase(): btBroadphaseInterface;
    getDispatchInfo(): btDispatcherInfo;
    getPairCache(): btOverlappingPairCache;

    addCollisionObject(colObj: btCollisionObject, collisionFilterGroup?: number, collisionFilterMask?: number): void;
    removeCollisionObject(colObj: btCollisionObject): void;

    // TODO$:
    // convexSweepTest(castShape: btConvexShape, from: btTransform, to: btTransform, resultCallback: ConvexResultCallback, allowedCcdPenetration: number): void;
    // contactPairTest(colObjA: btCollisionObject, colObjB: btCollisionObject, resultCallback: ContactResultCallback): void;
    // contactTest(colObj: btCollisionObject, resultCallback: ContactResultCallback): void;
    // updateSingleAabb(colObj: btCollisionObject): void;

    // rayTest(rayFromWorld: btVector3, rayToWorld: btVector3, resultCallback: RayResultCallback): void;
}

export class btContactSolverInfo {
    m_splitImpulse: boolean;
    m_splitImpulsePenetrationThreshold: number;
    m_numIterations: number;
}

export abstract class btActionInterface {
    updateAction(collisionWorld: btCollisionWorld, deltaTimeStep: number): void;
}

export abstract class btDynamicsWorld extends btCollisionWorld {
    getSolverInfo(): btContactSolverInfo;
    
    addAction(action: btActionInterface): void;
    removeAction(action: btActionInterface): void;
}

export class btDiscreteDynamicsWorld extends btDynamicsWorld {
    constructor(
        dispatcher: btDispatcher,
        broadphase: btBroadphaseInterface,
        constraintsolver: btConstraintSolver,
        collisionconfig: btCollisionConfiguration
    );

    getGravity(): btVector3;
    setGravity(gravity: btVector3): void;

    addRigidBody(body: btRigidBody): void;
    addRigidBody(body: btRigidBody, group: number, mask: number): void;
    removeRigidBody(body: btRigidBody): void;

    addConstraint(constraint: btTypedConstraint, disableCollisionsBetweenLinkedBodies?: boolean): void;
    removeConstraint(constraint: btTypedConstraint): void;

    stepSimulation(timeStep: number, maxSubSteps?: number, fixedTimeStep?: number): number;
}

export class btRigidBodyConstructionInfo {
    constructor(mass: number, motionState: btMotionState, collisionShape: btCollisionShape, localInertia?: btVector3);

    m_motionState: btMotionState;
    m_collisionShape: btCollisionShape;

    m_linearDamping: number;
    m_angularDamping: number;
    m_friction: number;
    m_rollingFriction: number;
    m_restitution: number;
    m_linearSleepingThreshold: number;
    m_angularSleepingThreshold: number;
    m_additionalDamping: boolean;
    m_additionalDampingFactor: number;
    m_additionalLinearDampingThresholdSqr: number;
    m_additionalAngularDampingThresholdSqr: number;
    m_additionalAngularDampingFactor: number;
}

export class btRigidBody extends btCollisionObject {
    constructor(info: btRigidBodyConstructionInfo);

    getLinearVelocity(): btVector3;
    SetLinearVelocity(lin_vel: btVector3): void;

    getAngularVelocity(): btVector3;
    setAngularVelocity(ang_vel: btVector3): void;

    getCenterOfMassTransform(): btTransform;
    setCenterOfMassTransform(xform: btTransform): void;

    setSleepingThresholds(linear: number, angular: number): void;
    setDamping(lin_damping: number, ang_damping: number): void;
    setMassProps(mass: number, inertia: btVector3): void;
    setLinearFactor(linearFactor: btVector3): void;
    setAngularFactor(angularFactorr: btVector3): void;

    getMotionState(): btMotionState;
    setMotionState(motionstate: btMotionState): void;

    getGravity(): btVector3;
    setGravity(acceleration: btVector3): void;

    applyTorque(torque: btVector3): void;
    applyLocalTorque(torque: btVector3): void;
    applyForce(force: btVector3, rel_pos: btVector3): void;
    applyCentralForce(force: btVector3): void;
    applyCentralLocalForce(force: btVector3): void;
    applyTorqueImpulse(torque: btVector3): void;
    applyImpulse(impulse: btVector3, rel_pos: btVector3): void;
    applyCentralImpulse(impulse: btVector3): void;
    applyGravity(): void;

    updateInertiaTensor(): void;

    getAabb(aabbMin: btVector3, aabbMax: btVector3): void;

    upcast(colObj: btCollisionObject): btRigidBody;
}

export class btSoftBody {
    constructor(worldInfo: btSoftBodyWorldInfo,  ode_count: number, x: btVector3, m: number[]);
}

export class btSoftBodyArray {
    publicsize(): number;
    at(n: number): btSoftBody;
}

export class btSoftBodyWorldInfo {
    get_air_density(): number;
    set_air_density(value: number): void;
    get_m_gravity(): btVector3;
    set_m_gravity(value: btVector3): void;
    get_m_maxDisplacement(): number;
    set_m_maxDisplacement(value: number): void;
    get_water_density(): number;
    set_water_density(value: number): void;
    get_water_normal(): btVector3;
    set_water_normal(value: btVector3): void;
    get_water_offset(): number;
    set_water_offset(value: number): void;
    get_m_broadphase(): btBroadphaseInterface;
    set_m_broadphase(value: btBroadphaseInterface): void;
    get_m_dispatcher(): btDispatcher;
    set_m_dispatcher(value: btDispatcher): void;
}

export abstract class btSoftBodySolver {
}

export class btDefaultSoftBodySolver extends btSoftBodySolver {
}

export class btSoftBodyRigidBodyCollisionConfiguration extends btDefaultCollisionConfiguration {
    constructor(info?: btCollisionConfiguration);
}

export class btSoftRigidDynamicsWorld extends btDiscreteDynamicsWorld {
    constructor(
        dispatcher: btDispatcher,
        broadphase: btBroadphaseInterface,
        constraintsolver: btConstraintSolver,
        collisionconfig: btCollisionConfiguration,
        solver?: btSoftBodySolver
    );

    getWorldInfo(): btSoftBodyWorldInfo;
    setWorldInfo(info: btSoftBodyWorldInfo): void;

    getSoftBodyArray(): btSoftBodyArray;

    addSoftBody(body: btSoftBody, collisionFilterGroup: number, collisionFilterMask: number): void;
    removeSoftBody(body: btSoftBody): void;
}

export class btSoftBodyHelpers {
    constructor();
    
    CreateRope(
        worldInfo: btSoftBodyWorldInfo,
        from: btVector3, to: btVector3,
        res: number,
        fixeds: number): btSoftBody;

    CreatePatch(
        worldInfo: btSoftBodyWorldInfo,
        corner00: btVector3,
        corner10: btVector3,
        corner01: btVector3,
        corner11: btVector3,
        resx: number, resy: number,
        fixeds: number,
        gendiags: boolean): btSoftBody;

    CreatePatchUV(
        worldInfo: btSoftBodyWorldInfo,
        corner00: btVector3,
        corner10: btVector3,
        corner01: btVector3,
        corner11: btVector3,
        resx: number, resy: number,
        fixeds: number,
        gendiags: boolean,
        tex_coords: number[]): btSoftBody;
    
    CreateEllipsoid(
        worldInfo: btSoftBodyWorldInfo,
        center: btVector3,
        radius: btVector3,
        lres: number): btSoftBody;
    
    CreateFromTriMesh(
        worldInfo: btSoftBodyWorldInfo,
        vertices: number[],
        triangles: number[],
        ntriangles: number,
        randomizeConstraints: boolean): btSoftBody;
    
    CreateFromConvexHull(
        worldInfo: btSoftBodyWorldInfo,
        vertices: btVector3,
        nvertices: number,
        randomizeConstraints: boolean): btSoftBody;
}

export function destroy(object: any): void;

export as namespace Ammo;

/*
  TODO$:

  [NoDelete]
  interface btCollisionObjectWrapper {
  };
  
  [Prefix="btCollisionWorld::"]
  interface RayResultCallback {
    // abstract base class, no constructor
    boolean hasHit();
    attribute short m_collisionFilterGroup;
    attribute short m_collisionFilterMask;
    [Const] attribute btCollisionObject m_collisionObject;
  };
  
  [Prefix="btCollisionWorld::"]
  interface ClosestRayResultCallback {
    void ClosestRayResultCallback([Const, Ref] btVector3 from, [Const, Ref] btVector3 to);
  
    [Value] attribute btVector3 m_rayFromWorld;
    [Value] attribute btVector3 m_rayToWorld;
    [Value] attribute btVector3 m_hitNormalWorld;
    [Value] attribute btVector3 m_hitPointWorld;
  };
  ClosestRayResultCallback implements RayResultCallback;
  
  interface btManifoldPoint {
    [Const, Ref] btVector3 getPositionWorldOnA();
    [Const, Ref] btVector3 getPositionWorldOnB();
    [Const] double getAppliedImpulse();
    [Const] double getDistance();
    [Value] attribute btVector3 m_localPointA;
    [Value] attribute btVector3 m_localPointB;
    [Value] attribute btVector3 m_positionWorldOnB;
    [Value] attribute btVector3 m_positionWorldOnA;
    [Value] attribute btVector3 m_normalWorldOnB;
  };
  
  [Prefix="btCollisionWorld::"]
  interface ContactResultCallback {
    float addSingleResult([Ref] btManifoldPoint cp, [Const] btCollisionObjectWrapper colObj0Wrap, long partId0, long index0, [Const] btCollisionObjectWrapper colObj1Wrap, long partId1, long index1);
  };
  
  [JSImplementation="ContactResultCallback"]
  interface ConcreteContactResultCallback {
    void ConcreteContactResultCallback();
    float addSingleResult([Ref] btManifoldPoint cp, [Const] btCollisionObjectWrapper colObj0Wrap, long partId0, long index0, [Const] btCollisionObjectWrapper colObj1Wrap, long partId1, long index1);
  };
  
  [Prefix="btCollisionWorld::"]
  interface LocalShapeInfo {
      attribute long m_shapePart;
      attribute long m_triangleIndex;
   };
  
  [Prefix="btCollisionWorld::"]
  interface LocalConvexResult  {
    void LocalConvexResult([Const] btCollisionObject hitCollisionObject, LocalShapeInfo localShapeInfo, [Const, Ref] btVector3 hitNormalLocal, [Const, Ref] btVector3 hitPointLocal, float hitFraction);
    [Const] attribute btCollisionObject m_hitCollisionObject;
    attribute LocalShapeInfo m_localShapeInfo;
    [Value] attribute btVector3 m_hitNormalLocal;
    [Value] attribute btVector3 m_hitPointLocal;
    attribute float m_hitFraction;
  };
  
  [Prefix="btCollisionWorld::"]
  interface ConvexResultCallback {
    // abstract base class, no constructor
    boolean hasHit();
    attribute short m_collisionFilterGroup;
    attribute short m_collisionFilterMask;
    attribute float m_closestHitFraction;
  };
  
  [Prefix="btCollisionWorld::"]
  interface ClosestConvexResultCallback {
    void ClosestConvexResultCallback([Const, Ref] btVector3 convexFromWorld, [Const, Ref] btVector3 convexToWorld);
  
    [Value] attribute btVector3 m_convexFromWorld;
    [Value] attribute btVector3 m_convexToWorld;
    [Value] attribute btVector3 m_hitNormalWorld;
    [Value] attribute btVector3 m_hitPointWorld;
  };
  ClosestConvexResultCallback implements ConvexResultCallback;
  
  interface btConvexTriangleMeshShape {
    void btConvexTriangleMeshShape(btStridingMeshInterface meshInterface, optional boolean calcAabb);
  };
  btConvexTriangleMeshShape implements btConvexShape;
  
  interface btConvexHullShape {
    void btConvexHullShape();
    void addPoint([Const, Ref] btVector3 point, optional boolean recalculateLocalAABB);
    void setMargin(float margin);
    float getMargin();
  };
  btConvexHullShape implements btCollisionShape;
  
  interface btStridingMeshInterface {
  };
  
  interface btTriangleMesh {
    void btTriangleMesh(optional boolean use32bitIndices, optional boolean use4componentVertices);
    void addTriangle([Const, Ref] btVector3 vertex0, [Const, Ref] btVector3 vertex1, [Const, Ref] btVector3 vertex2, optional boolean removeDuplicateVertices);
  };
  btTriangleMesh implements btStridingMeshInterface;
  
  enum PHY_ScalarType {
      "PHY_FLOAT",
      "PHY_DOUBLE",
      "PHY_INTEGER",
      "PHY_SHORT",
      "PHY_FIXEDPOINT88",
      "PHY_UCHAR"
  };
  
  interface btTriangleMeshShape {
  };
  btTriangleMeshShape implements btConcaveShape;
  
  interface btBvhTriangleMeshShape {
    void btBvhTriangleMeshShape(btStridingMeshInterface meshInterface, boolean useQuantizedAabbCompression, optional boolean buildBvh);
  };
  btBvhTriangleMeshShape implements btTriangleMeshShape;
  
  interface btHeightfieldTerrainShape {
      void btHeightfieldTerrainShape(long heightStickWidth, long heightStickLength, VoidPtr heightfieldData, float heightScale, float minHeight, float maxHeight, long upAxis, PHY_ScalarType hdt, boolean flipQuadEdges);
      void setMargin(float margin);
      float getMargin();
  };
  btHeightfieldTerrainShape implements btConcaveShape;
  
  interface btDefaultCollisionConstructionInfo {
    void btDefaultCollisionConstructionInfo();
  };
  
  interface btDefaultCollisionConfiguration {
    void btDefaultCollisionConfiguration([Ref] optional btDefaultCollisionConstructionInfo info);
  };
  
  interface btPersistentManifold {
    void btPersistentManifold();
    [Const] btCollisionObject getBody0();
    [Const] btCollisionObject getBody1();
    long getNumContacts();
    [Ref] btManifoldPoint getContactPoint(long index);
  };
  
  interface btDispatcher {
    long getNumManifolds();
    btPersistentManifold getManifoldByIndexInternal(long index);
  };
  
  interface btAxisSweep3 {
    void btAxisSweep3([Ref] btVector3 worldAabbMin, [Ref] btVector3 worldAabbMax, optional long maxHandles, optional btOverlappingPairCache pairCache, optional boolean disableRaycastAccelerator);
  };

  interface btConstraintSetting {
    void btConstraintSetting();
    attribute float m_tau;
    attribute float m_damping;
    attribute float m_impulseClamp;
  };
  
  enum btConstraintParams {
    "BT_CONSTRAINT_ERP",
    "BT_CONSTRAINT_STOP_ERP",
    "BT_CONSTRAINT_CFM",
    "BT_CONSTRAINT_STOP_CFM"
  };
  
  interface btPoint2PointConstraint {
    void btPoint2PointConstraint([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Ref] btVector3 pivotInA, [Ref] btVector3 pivotInB);
    void btPoint2PointConstraint([Ref] btRigidBody rbA, [Ref] btVector3 pivotInA);
    void setPivotA([Const, Ref] btVector3 pivotA);
    void setPivotB([Const, Ref] btVector3 pivotB);
    [Const, Ref] btVector3 getPivotInA();
    [Const, Ref] btVector3 getPivotInB();
  
    [Value] attribute btConstraintSetting m_setting;
  };
  btPoint2PointConstraint implements btTypedConstraint;
  
  interface btGeneric6DofConstraint {
    void btGeneric6DofConstraint([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Ref] btTransform frameInA, [Ref] btTransform frameInB, boolean useLinearFrameReferenceFrameA);
    void btGeneric6DofConstraint([Ref] btRigidBody rbB, [Ref] btTransform frameInB, boolean useLinearFrameReferenceFrameB);
    void setLinearLowerLimit([Const, Ref] btVector3 linearLower);
    void setLinearUpperLimit([Const, Ref] btVector3 linearUpper);
    void setAngularLowerLimit([Const, Ref] btVector3 angularLower);
    void setAngularUpperLimit([Const, Ref] btVector3 angularUpper);
    [Const, Ref] btTransform getFrameOffsetA();
  };
  btGeneric6DofConstraint implements btTypedConstraint;
  
  interface btGeneric6DofSpringConstraint {
    void btGeneric6DofSpringConstraint([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Ref] btTransform frameInA, [Ref] btTransform frameInB, boolean useLinearFrameReferenceFrameA);
    void btGeneric6DofSpringConstraint([Ref] btRigidBody rbB, [Ref] btTransform frameInB, boolean useLinearFrameReferenceFrameB);
    void enableSpring(long index, boolean onOff);
    void setStiffness(long index, float stiffness);
    void setDamping(long index, float damping);
  };
  btGeneric6DofSpringConstraint implements btGeneric6DofConstraint;
  
  interface btConeTwistConstraint {
    void btConeTwistConstraint([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Ref] btTransform rbAFrame, [Ref] btTransform rbBFrame);
    void btConeTwistConstraint([Ref] btRigidBody rbA, [Ref] btTransform rbAFrame);
  
    void setLimit(long limitIndex, float limitValue);
    void setAngularOnly(boolean angularOnly);
    void setDamping(float damping);
    void enableMotor(boolean b);
    void setMaxMotorImpulse(float maxMotorImpulse);
    void setMaxMotorImpulseNormalized(float maxMotorImpulse);
    void setMotorTarget([Const,Ref] btQuaternion q);
    void setMotorTargetInConstraintSpace([Const,Ref] btQuaternion q);
  };
  btConeTwistConstraint implements btTypedConstraint;
  
  interface btHingeConstraint {
    void btHingeConstraint ([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Ref] btVector3 pivotInA, [Ref] btVector3 pivotInB, [Ref] btVector3 axisInA, [Ref] btVector3 axisInB, optional boolean useReferenceFrameA);
    //void btHingeConstraint ([Ref] btRigidBody rbA, [Ref] btVector3 pivotInA, [Ref] btVector3 axisInA, optional boolean useReferenceFrameA);
    void btHingeConstraint ([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Ref] btTransform rbAFrame, [Ref] btTransform rbBFrame, optional boolean useReferenceFrameA);
    void btHingeConstraint ([Ref] btRigidBody rbA, [Ref] btTransform rbAFrame, optional boolean useReferenceFrameA);
  
    void setLimit(float low, float high, float softness, float biasFactor, optional float relaxationFactor);
    void enableAngularMotor(boolean enableMotor, float targetVelocity, float maxMotorImpulse);
    void setAngularOnly(boolean angularOnly);
    
    void enableMotor(boolean enableMotor);
    void setMaxMotorImpulse(float maxMotorImpulse);
    //void setMotorTarget([Const,Ref] btQuaternion qAinB, float dt);
    void setMotorTarget(float targetAngle, float dt);
  };
  btHingeConstraint implements btTypedConstraint;
  
  interface btSliderConstraint {
    void btSliderConstraint([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Const,Ref] btTransform frameInA, [Const,Ref] btTransform frameInB, boolean useLinearReferenceFrameA);
    void btSliderConstraint([Ref] btRigidBody rbB, [Const,Ref] btTransform frameInB, boolean useLinearReferenceFrameA);
    void setLowerLinLimit(float lowerLimit);
    void setUpperLinLimit(float upperLimit);
    void setLowerAngLimit(float lowerAngLimit);
    void setUpperAngLimit(float upperAngLimit);
  };
  btSliderConstraint implements btTypedConstraint;
  
  interface btFixedConstraint {
    void btFixedConstraint([Ref] btRigidBody rbA, [Ref] btRigidBody rbB, [Const,Ref] btTransform frameInA, [Const,Ref] btTransform frameInB);
  };
  btFixedConstraint implements btTypedConstraint;
    
  [Prefix="btRaycastVehicle::", NoDelete]
  interface btVehicleTuning {
    void btVehicleTuning();
    attribute float m_suspensionStiffness;
    attribute float m_suspensionCompression;
    attribute float m_suspensionDamping;
    attribute float m_maxSuspensionTravelCm;
    attribute float m_frictionSlip;
    attribute float m_maxSuspensionForce;
  };
  
  [Prefix="btDefaultVehicleRaycaster::"]
  interface btVehicleRaycasterResult {
      [Value] attribute btVector3 m_hitPointInWorld;
      [Value] attribute btVector3 m_hitNormalInWorld;
      attribute float m_distFraction;
  };
  
  interface btVehicleRaycaster {
      void castRay ([Const, Ref] btVector3 from, [Const, Ref] btVector3 to, [Const, Ref] btVehicleRaycasterResult result);
  };
  
  interface btDefaultVehicleRaycaster {
    void btDefaultVehicleRaycaster(btDynamicsWorld world);
  };
  btDefaultVehicleRaycaster implements btVehicleRaycaster;
  
  [Prefix="btWheelInfo::"]
  interface RaycastInfo {
    [Value] attribute btVector3 m_contactNormalWS;
    [Value] attribute btVector3 m_contactPointWS;
    attribute float m_suspensionLength;
    [Value] attribute btVector3 m_hardPointWS;
    [Value] attribute btVector3 m_wheelDirectionWS;
    [Value] attribute btVector3 m_wheelAxleWS;
    attribute boolean m_isInContact;
    attribute any m_groundObject;
  };
  
  interface btWheelInfoConstructionInfo {
      [Value] attribute btVector3 m_chassisConnectionCS;
      [Value] attribute btVector3 m_wheelDirectionCS;
      [Value] attribute btVector3 m_wheelAxleCS;
      attribute float m_suspensionRestLength;
      attribute float m_maxSuspensionTravelCm;
      attribute float m_wheelRadius;
      attribute float m_suspensionStiffness;
      attribute float m_wheelsDampingCompression;
      attribute float m_wheelsDampingRelaxation;
      attribute float m_frictionSlip;
      attribute float m_maxSuspensionForce;
      attribute boolean m_bIsFrontWheel;
  };
  
  interface btWheelInfo {
    attribute float m_suspensionStiffness;
    attribute float m_frictionSlip;
    attribute float m_engineForce;
    attribute float m_rollInfluence;
    attribute float m_suspensionRestLength1;
    attribute float m_wheelsRadius;
    attribute float m_wheelsDampingCompression;
    attribute float m_wheelsDampingRelaxation;
    attribute float m_steering;
    attribute float m_maxSuspensionForce;
    attribute float m_maxSuspensionTravelCm;
    attribute float m_wheelsSuspensionForce;
    attribute boolean m_bIsFrontWheel;
    [Value] attribute RaycastInfo m_raycastInfo;
    [Value] attribute btVector3 m_chassisConnectionPointCS;
    void btWheelInfo([Ref] btWheelInfoConstructionInfo ci);
    float getSuspensionRestLength ();
    void  updateWheel ([Const, Ref] btRigidBody chassis, [Ref] RaycastInfo raycastInfo);
    [Value] attribute btTransform m_worldTransform;
    [Value] attribute btVector3 m_wheelDirectionCS;
    [Value] attribute btVector3 m_wheelAxleCS;
    attribute float m_rotation;
    attribute float m_deltaRotation;
    attribute float m_brake;
    attribute float  m_clippedInvContactDotSuspension;
    attribute float  m_suspensionRelativeVelocity;
    attribute float  m_skidInfo;
  };
  
  interface btKinematicCharacterController {
    void btKinematicCharacterController(btPairCachingGhostObject ghostObject, btConvexShape convexShape, float stepHeight, optional long upAxis);
  
    void setUpAxis (long axis);
    void setWalkDirection ([Const,Ref] btVector3 walkDirection);
    void setVelocityForTimeInterval ([Const,Ref] btVector3 velocity, float timeInterval);
    //void reset ();
    void warp ([Const, Ref]btVector3 origin);
    void preStep (btCollisionWorld collisionWorld);
    void playerStep (btCollisionWorld collisionWorld, float dt);
    void setFallSpeed (float fallSpeed);
    void setJumpSpeed (float jumpSpeed);
    void setMaxJumpHeight (float maxJumpHeight);
    boolean canJump ();
    void jump ();
    void setGravity (float gravity);
    float getGravity ();
    void setMaxSlope (float slopeRadians);
    float getMaxSlope ();
    btPairCachingGhostObject getGhostObject ();
    void setUseGhostSweepTest (boolean useGhostObjectSweepTest);
    boolean onGround ();
    void setUpInterpolate (boolean value);
  };
  btKinematicCharacterController implements btActionInterface;
  
  interface btRaycastVehicle {
    void btRaycastVehicle([Const, Ref] btVehicleTuning tuning, btRigidBody chassis, btVehicleRaycaster raycaster);
    void applyEngineForce(float force, long wheel);
    void setSteeringValue(float steering, long wheel);
    [Const, Ref] btTransform getWheelTransformWS(long wheelIndex);
    void updateWheelTransform(long wheelIndex, boolean interpolatedTransform);
    [Ref] btWheelInfo addWheel([Const, Ref] btVector3 connectionPointCS0, [Const, Ref] btVector3 wheelDirectionCS0, [Const, Ref] btVector3 wheelAxleCS, float suspensionRestLength, float wheelRadius, [Const, Ref] btVehicleTuning tuning, boolean isFrontWheel);
    long getNumWheels();
    btRigidBody getRigidBody();
    [Ref] btWheelInfo getWheelInfo(long index);
    void setBrake(float brake, long wheelIndex);
    void setCoordinateSystem(long rightIndex, long upIndex, long forwardIndex);
    float getCurrentSpeedKmHour();
    [Const, Ref] btTransform getChassisWorldTransform();
    float rayCast([Ref] btWheelInfo wheel);
    void updateVehicle(float step);
    void resetSuspension();
    float getSteeringValue(long wheel);
    void updateWheelTransformsWS([Ref] btWheelInfo wheel, optional boolean interpolatedTransform);
    void setPitchControl(float pitch);
    void updateSuspension(float deltaTime);
    void updateFriction(float timeStep);
    long getRightAxis();
    long getUpAxis();
    long getForwardAxis();
    [Value] btVector3 getForwardVector();
    long getUserConstraintType();
    void setUserConstraintType(long userConstraintType);
    void setUserConstraintId(long uid);
    long getUserConstraintId();
  };
  btRaycastVehicle implements btActionInterface;
  
  interface btGhostObject {
    void btGhostObject();
    long getNumOverlappingObjects();
    btCollisionObject getOverlappingObject(long index);
  };
  btGhostObject implements btCollisionObject;
  
  interface btPairCachingGhostObject {
    void btPairCachingGhostObject();
  };
  btPairCachingGhostObject implements btGhostObject;
  
  interface btGhostPairCallback {
    void btGhostPairCallback();
  };
  
  interface btSoftBodyWorldInfo {
    void btSoftBodyWorldInfo();
    attribute float air_density;
    attribute float water_density;
    attribute float water_offset;
    attribute float m_maxDisplacement;
    [Value] attribute btVector3 water_normal;
    attribute btBroadphaseInterface m_broadphase;
    attribute btDispatcher m_dispatcher;
    [Value] attribute btVector3 m_gravity;
  };
  
  [Prefix="btSoftBody::"]
  interface Node {
    [Value] attribute btVector3 m_x;
    [Value] attribute btVector3 m_n;
    [Value] attribute btVector3 m_f;
    [Value] attribute btVector3 m_v;
  };
  
  [Prefix="btSoftBody::"]
  interface tNodeArray {
    [Const] long size();
    [Const, Ref] Node at(long n);
  };
  
  [Prefix="btSoftBody::"]
  interface Material {
    attribute float m_kLST;
    attribute float m_kAST;
    attribute float m_kVST;
    attribute long m_flags;
  };
  
  [Prefix="btSoftBody::"]
  interface tMaterialArray {
    [Const] long size();
    Material at(long n);
  };
  
  [Prefix="btSoftBody::"]
  interface Anchor {
    attribute Node m_node;
    [Value] attribute btVector3 m_local;
    attribute btRigidBody m_body;
    attribute float m_influence;
    [Value] attribute btMatrix3x3 m_c0;
    [Value] attribute btVector3 m_c1;
    attribute float m_c2;
  };
  
  [Prefix="btSoftBody::"]
  interface tAnchorArray {
    [Const] long size();
    [Value] Anchor at(long n);
    void clear();
    void push_back([Ref] Anchor val);
    void pop_back();
  };
  
  [Prefix="btSoftBody::"]
  interface Config {
    attribute float kVCF;
    attribute float kDP;
    attribute float kDG;
    attribute float kLF;
    attribute float kPR;
    attribute float kVC;
    attribute float kDF;
    attribute float kMT;
    attribute float kCHR;
    attribute float kKHR;
    attribute float kSHR;
    attribute float kAHR;
    attribute float kSRHR_CL;
    attribute float kSKHR_CL;
    attribute float kSSHR_CL;
    attribute float kSR_SPLT_CL;
    attribute float kSK_SPLT_CL;
    attribute float kSS_SPLT_CL;
    attribute float maxvolume;
    attribute float timescale;
    attribute long viterations;
    attribute long piterations;
    attribute long diterations;
    attribute long citerations;
    attribute long collisions;
  };
  
  interface btSoftBody {
    void btSoftBody(btSoftBodyWorldInfo worldInfo, long node_count, btVector3 x, float[] m);

    [Value] attribute Config m_cfg;
    [Value] attribute tNodeArray m_nodes;
    [Value] attribute tMaterialArray m_materials;
    [Value] attribute tAnchorArray m_anchors; 

    [Const] boolean checkLink( long node0, long node1);
    [Const] boolean checkFace( long node0, long node1, long node2);
    Material appendMaterial();
    void appendNode( [Const, Ref] btVector3 x, float m);
    void appendLink( long node0, long node1, Material mat, boolean bcheckexist);
    void appendFace( long node0, long node1, long node2, Material mat);
    void appendTetra( long node0, long node1, long node2, long node3, Material mat);
    void appendAnchor( long node, btRigidBody body, boolean disableCollisionBetweenLinkedBodies, float influence);
    void addForce([Const, Ref] btVector3 force);
    void addForce([Const, Ref] btVector3 force, long node);
    void addAeroForceToNode([Const, Ref] btVector3 windVelocity, long nodeIndex);
    [Const] float getTotalMass();
    void setTotalMass( float mass, boolean fromfaces);
    void setMass(long node, float mass);
    void transform( [Const, Ref] btTransform trs);
    void translate( [Const, Ref] btVector3 trs);
    void rotate( [Const, Ref] btQuaternion rot);
    void scale(  [Const, Ref] btVector3 scl);
    long generateClusters(long k, optional long maxiterations);
    long generateBendingConstraints(long distance, Material mat);
    btSoftBody upcast([Const] btCollisionObject colObj);
  };
  btSoftBody implements btCollisionObject;
*/