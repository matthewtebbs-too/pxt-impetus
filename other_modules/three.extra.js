/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('three/examples/js/QuickHull');
THREE.Detector = require('three/examples/js/Detector');

require('three/examples/js/controls/OrbitControls');
require('three/examples/js/controls/TrackballControls');

require('three/examples/js/geometries/TeapotBufferGeometry');

require('three/examples/js/math/ColorConverter');

if (typeof module === 'object') {
	module.exports = THREE;
}