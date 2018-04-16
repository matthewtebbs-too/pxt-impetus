# Interactive Cubes

Click a floating cube! (NYI)

```blocks
    let boxobject: Mesh3d = null
    let boxshape: Shape3d = null
    let intersected: Object3d = null
    let mouseY = 0
    let mouseX = 0
    let theta = 0
    scene.onAnimate(function (msec) {
        theta += 0.1 * msec / (1 / 60)
        world.scene().camera.setPosition(Math.vector(100 * Math.sin(Math.degreesInRadians(theta)), 100 * Math.sin(Math.degreesInRadians(theta)), 100 * Math.cos(Math.degreesInRadians(theta))))
        world.scene().camera.lookAt(scene.origin())
        intersected = scene.intersectedObjectAt(mouseX, mouseY)
    })
    input.onMouseMove(function (x, y) {
        mouseX = x
        mouseY = y
    })
    theta = 0
    world.scene().setBackgroundColor(design.standardColor(Palette.LightCyan))
    world.scene().add(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(5, 20, 0))
    boxshape = design.boxShape(20, 20, 20)
    for (let i = 0; i < 2000; i++) {
        boxobject = object.fromShapeAndMaterial(boxshape, design.materialOfColor(design.randomColor()))
        world.scene().add(boxobject, Math.vector(Math.randomRange(-400, 400), Math.randomRange(-400, 400), Math.randomRange(-400, 400)))
    }
```

```package
```