# Falling Spheres

Watch the spheres fall!

```blocks
    let sphereshape: Shape3d = null
    let spheremesh: Mesh3d = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            spheremesh = object.fromShapeAndMaterial(sphereshape, design.materialOfColor(design.randomColor()))
            world.scene().add(spheremesh, Math.vector(0, 40, 0))
            spheremesh.setPhysicsEnabled(true)
            count += -1
        }
    })
    count = 200
    world.scene().add(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(0, 10, 0))
    world.scene().add(object.fromShapeAndMaterial(design.planeShape(100, 100), design.materialOfColor(design.colorPicker(0xffffff))), world.origin())
    sphereshape = design.sphereShape(2)
```

```package
```