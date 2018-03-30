# Falling Spheres

Watch the spheres fall!

```blocks
    let sphereshape: Shape3d = null
    let boxmesh: Mesh = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            boxmesh = object3d.mesh(sphereshape, material.ofColor(design.colorRandom()))
            world3d.scene().add(boxmesh, math.vector(0, 40, 0))
            boxmesh.enablePhysics(true)
            count += -1
        }
    })
    count = 200
    world3d.scene().add(light.directional(design.colorPicker(Palette.white), 1), math.vector(0, 10, 0))
    world3d.scene().add(object3d.mesh(design.plane(100, 100), material.ofColor(design.colorPicker(Palette.white))), world3d.origin())
    sphereshape = design.sphere(2)
```

```package
```