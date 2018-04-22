world.scene().camera = design.perspectiveCamera()
world.scene().camera.position = Math.vector(0, 20, 20)
world.scene().camera.lookAtPosition(Math.zeroVector())
world.scene().addAt(design.directionalLight(design.colorPicker(0xffffff), 1), Math.vector(5, 20, 0))