# Interactive Cubes

Click a floating cube! (NYI)

```blocks
    let object: Mesh = null
    let boxshape: Shape3d = null
    let theta = 0
    scene.onAnimate(function (msec) {
        theta += 0.1 * msec / (1 / 60)
        world3d.camera().setPosition(math.vector(100 * Math.sin(math.degreesInRadians(theta)), 100 * Math.sin(math.degreesInRadians(theta)), 100 * Math.cos(math.degreesInRadians(theta))))
        world3d.camera().lookAt(world3d.origin())
    })
    theta = 0
    world3d.scene().setBackgroundColor(design.colorStandard(Palette.lightcyan))
    world3d.scene().add(light.directional(design.colorPicker(0xffffff), 1), math.unitVector())
        boxshape = design.box(20, 20, 20)
        for (let i = 0; i < 2000; i++) {
        object = object3d.from3dShape(boxshape, material.ofColor(design.colorRandom()))
        world3d.scene().add(object, math.vector(Math.randomRange(-400, 400), Math.randomRange(-400, 400), Math.randomRange(-400, 400)))
    }
```

```package
```