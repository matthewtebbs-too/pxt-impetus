# Falling Spheres

Watch the spheres fall.

```blocks
    let sphereshape: Shape3d = null
    let sphereobject: Mesh3d = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            sphereobject = object.fromShapeAndMaterial(sphereshape, design.materialOfColor(design.randomColor()))
            world.scene().addAt(sphereobject, Math.vector(0, 40, 0))
            sphereobject.setPhysicsEnabled(true)
            count += -1
        }
    })
    count = 200
    world.scene().camera = design.perspectiveCamera()
    world.scene().camera.position = Math.vector(0, 25, 45)
    world.scene().camera.lookAtPosition(Math.zeroVector())
    world.scene().addAt(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(5, 20, 0))
    world.scene().addAt(object.fromShapeAndMaterial(design.planeShape(100, 100), design.materialOfColor(design.colorPicker(0xffffff))), Math.zeroVector())
    sphereshape = design.sphereShape(2)
```

```package
```