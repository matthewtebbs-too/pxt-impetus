# Falling Spheres

Watch the spheres fall!

```blocks
    let spheregeom: Geometry = null
    let boxmesh: Mesh = null
    let count = 0
    loops.forever(function () {
        if (count > 0) {
            boxmesh = object3d.mesh(spheregeom, material.colorMaterial(design.colorRandom()))
            world.currentScene().addObject(boxmesh, math.vector(0, 40, 0))
            boxmesh.enablePhysics(true)
            count += -1
        }
    })
    count = 200
    world.currentScene().addObject(light.directionalLight(design.colorNumberPicker(0xffffff), 1), math.vector(0, 10, 0))
    world.currentScene().addObject(object3d.mesh(design.plane(100, 100), material.colorMaterial(design.colorNumberPicker(0xffffff))), world.origin())
    spheregeom = design.sphere(2)
```

```package
```