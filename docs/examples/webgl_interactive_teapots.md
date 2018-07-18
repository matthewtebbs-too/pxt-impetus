# Interactive Cubes

Hover over a floating teapot.

```blocks
    let teapotobject: Mesh3d = null
    let intersected: Object3d = null
    let teapotshape: Shape3d = null
    let mouseY = 0
    let mouseIn = false
    let mouseX = 0
    let theta = 0
    theta = 0
    world.scene().camera = design.perspectiveCamera()
    world.scene().camera.position = Math.vector(0, 20, 20)
    world.scene().camera.lookAtPosition(Math.zeroVector())
    world.scene().backgroundColor = design.standardColor(Palette.LightCyan)
    world.scene().addAt(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(5, 20, 0))
    teapotshape = design.teapotShape(12)
    for (let i = 0; i < 2000; i++) {
        teapotobject = object.fromShapeAndMaterial(teapotshape, design.materialOfColor(design.randomColor()))
        world.scene().addAt(teapotobject, scene.randomPositionInCube(800));
    }
    scene.onAnimate(function (msec) {
        theta += 0.1 * msec / (1 / 60)
        world.scene().camera.position = Math.vector(100 * Math.sin(Math.degreesInRadians(theta)), 100 * Math.sin(Math.degreesInRadians(theta)), 100 * Math.cos(Math.degreesInRadians(theta)))
        world.scene().camera.lookAtPosition(Math.zeroVector())
        if (intersected) {
            object.materialOf(intersected).emissive = design.standardColor(Palette.Black)
        }
        if (mouseIn) {
            intersected = scene.intersectedObjectAt(mouseX, mouseY)
            if (intersected) {
                object.materialOf(intersected).emissive = design.standardColor(Palette.Red)
            }
        }
    })
    input.onMouseMove(function (x, y) {
        mouseX = x
        mouseY = y
    })
    input.onMouseEnter(function () {
        mouseIn = true
    })
    input.onMouseLeave(function () {
        mouseIn = false
    })
```

```package
```
