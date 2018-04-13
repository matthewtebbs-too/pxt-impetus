# Test

Test.

```blocks
    let myroughness = 0
    let mycolor: Color = null
    let material: Material = null
    loops.forever(function () {
        material.roughness += myroughness
        material.color = mycolor
    })
    material = design.materialOfColor(design.colorPicker(0xffffff))
    mycolor = material.emissive
    myroughness = material.metalness
```

```package
```