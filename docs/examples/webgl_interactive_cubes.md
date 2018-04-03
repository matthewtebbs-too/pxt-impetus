# Interactive Cubes

Click a floating cube! (NYI)

```blocks
    let object: Mesh = null
    let boxshape: Shape3d = null
    let theta = 0
    scene.onAnimate(function (msec) {
        theta += 0.1 * msec / (1 / 60)
        world3d.camera().setPosition(Math.vector(100 * Math.sin(Math.degreesInRadians(theta)), 100 * Math.sin(Math.degreesInRadians(theta)), 100 * Math.cos(Math.degreesInRadians(theta))))
        world3d.camera().lookAt(world3d.origin())
    })
    theta = 0
    world3d.scene().setBackgroundColor(design.standardColor(Palette.lightcyan))
    world3d.scene().add(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(5, 20, 0))
    boxshape = design.boxShape(20, 20, 20)
    for (let i = 0; i < 2000; i++) {
        object = object3d.fromShapeAndMaterial(boxshape, design.materialOfColor(design.randomColor()))
        world3d.scene().add(object, Math.vector(Math.randomRange(-400, 400), Math.randomRange(-400, 400), Math.randomRange(-400, 400)))
    }
```

```package
```