let object: Mesh = null
let boxgeometry: Geometry = null
let theta = 0
scene.onAnimate(function (msec) {
    theta += 0.1 * msec / (1 / 60)
    world.activeCamera().setPosition(math.vector(100 * Math.sin(math.degreesInRadians(theta)), 100 * Math.sin(math.degreesInRadians(theta)), 100 * Math.cos(math.degreesInRadians(theta))))
    world.activeCamera().lookAt(world.origin())
})
theta = 0
world.currentScene().setBackgroundColor(design.colorStandard(Palette.lightcyan))
world.currentScene().addObject(light.directionalLight(design.colorNumberPicker(0xffffff), 1), math.unitVector())
boxgeometry = design.box(20, 20, 20)
for (let i = 0; i < 2000; i++) {
    object = object3d.mesh(boxgeometry, material.colorMaterial(design.colorRandom()))
    world.currentScene().addObject(object, math.vector(Math.randomRange(-400, 400), Math.randomRange(-400, 400), Math.randomRange(-400, 400)))
}
