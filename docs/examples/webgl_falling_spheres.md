# Falling Spheres

Watch the spheres fall!

```blocks
    let sphereshape: Shape3d = null
    let boxmesh: Mesh = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            boxmesh = object3d.from3dShape(sphereshape, material.ofColor(design.colorRandom()))
            world3d.scene().add(boxmesh, math.vector(0, 40, 0))
            boxmesh.setPhysicsEnabled(true)
            count += -1
        }
    })
    count = 200
    world3d.scene().add(light.directional(design.colorPicker(0xffffff), 1), math.vector(0, 10, 0))
    world3d.scene().add(object3d.from3dShape(design.plane(100, 100), material.ofColor(design.colorPicker(0xffffff))), world3d.origin())
    sphereshape = design.sphere(2)
```

```package
```