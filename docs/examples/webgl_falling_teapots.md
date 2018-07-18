# Falling Spheres

Watch the teapots fall.

```blocks
    let sphereshape: Shape3d = null
    let position: Vector = null
    let sphereobject: Mesh3d = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            sphereobject = object.fromShapeAndMaterial(sphereshape, design.materialOfColor(design.randomColor()))
            position = Math.vectorOp(scene.randomPositionOnPlane(50), MathOp.Add, Math.vector(0, 40, 0))
            world.scene().addAt(sphereobject, position)
            sphereobject.setPhysicsEnabled(true)
            count += -1
        }
    })
    count = 1000
    world.scene().camera = design.perspectiveCamera()
    world.scene().camera.position = Math.vector(0, 25, 45)
    world.scene().camera.lookAtPosition(Math.zeroVector())
    world.scene().camera.attachController(CameraController.Orbit)
    world.scene().addAt(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(5, 20, 0))
    world.scene().addAt(object.fromShapeAndMaterial(design.planeShape(100, 100), design.materialOfColor(design.colorPicker(0xffffff))), Math.zeroVector())
    sphereshape = design.teapotShape(2)
```

```package
```