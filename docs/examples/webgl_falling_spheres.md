# Falling Spheres

Watch the spheres fall!

```blocks
    let sphereshape: Shape3d = null
    let boxmesh: Mesh = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            boxmesh = object3d.fromShapeAndMaterial(sphereshape, design.materialOfColor(design.randomColor()))
            world3d.scene().add(boxmesh, math3d.vector(0, 40, 0))
            boxmesh.setPhysicsEnabled(true)
            count += -1
        }
    })
    count = 200
    world3d.scene().add(design.directionalLight(design.colorPicker(0xffffff), 1), math3d.vector(0, 10, 0))
    world3d.scene().add(object3d.fromShapeAndMaterial(design.planeShape(100, 100), design.materialOfColor(design.colorPicker(0xffffff))), world3d.origin())
    sphereshape = design.sphereShape(2)
```

```package
```