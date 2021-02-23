import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {VRButton} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	camera.position.y = 1;
	camera.position.z = 5;
	camera.rotation.x = -0.1;

	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	/*
	vsize = 1;
	var plane = new THREE.PlaneGeometry(vsize*4, vsize*3, 1, 1);
	for(var i=0; i<plane.vertices.length/2; i++) {
		plane.vertices[2*i].position.z = Math.pow(2, i/20);
		plane.vertices[2*i+1].position.z = Math.pow(2, i/20);
	}
	var virtual_screen = new THREE.Mesh(plane, new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} ));
	scene.add(virtual_screen);*/

	var vsize = 1;
	const geometry1 = new THREE.PlaneBufferGeometry( 4*vsize, 3*vsize, 20, 1 );
	const material1 = new THREE.MeshBasicMaterial( {color: 0x9e49af, side: THREE.DoubleSide, wireframe: true} );
	const plane = new THREE.Mesh( geometry1, material1 );
	scene.add(plane);
	console.log(plane.geometry.getAttribute("position").array);

	let pos = plane.geometry.getAttribute("position");
	let pa = pos.array;
	var hVerts = plane.geometry.heightSegments + 1;
	var wVerts = plane.geometry.widthSegments + 1;
	for (let j = 0; j < hVerts; j++) {
		for (let i = 0; i < wVerts; i++) {
								//+0 is x, +1 is y.
			pa[3*(j*wVerts+i)+2] = Math.random();
		}
	}
	pos.needsUpdate = true;
	plane.geometry.computeVertexNormals();

	/*
	const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
	const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	const cube = new THREE.Mesh( geometry2, material2 );
	scene.add( cube );
	*/

	renderer.setAnimationLoop( function () {
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
} );