import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {VRButton} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/webxr/VRButton.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.xr.enabled = true;
document.body.appendChild( VRButton.createButton( renderer ) );
camera.position.y = 1;
camera.position.z = 5;
camera.rotation.x = -0.1;

const controls = new OrbitControls( camera, renderer.domElement );
//camera.position.set( 0, 20, 100 );
controls.update();

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );


var vsize = 1;
const geometry1 = new THREE.PlaneBufferGeometry( 4*vsize, 3*vsize, 20, 1 );
const material1 = new THREE.MeshBasicMaterial({color: 0x9e49af, side: THREE.DoubleSide});

//VIDEO SRC
const video = document.createElement('video');
//video.autoplay = true;
video.hidden = true;
video.muted = true;
var src = document.createElement("source"); 
src.type = "video/ogg";
src.src = "test.ogv";
video.appendChild(src);
document.body.appendChild(video);
video.play();

/* const video = document.createElement('img');
video.src = "http://192.168.1.200:81/stream";
video.crossOrigin = "Anonymous";
document.body.appendChild(video);*/

//CANVAS TO COMPOSE SCREEN
const vcanvas = document.createElement('canvas');
vcanvas.crossOrigin = "Anonymous";
vcanvas.width = 640;
vcanvas.height = 480;
const vctx = vcanvas.getContext( '2d' );
// background color if no video present
vctx.fillStyle = '#FF0000';
vctx.fillRect( 0, 0, vcanvas.width, vcanvas.height );
const vtexture = new THREE.VideoTexture(vcanvas);
var vmaterial = new THREE.MeshBasicMaterial( { map: vtexture, side:THREE.DoubleSide } );
const plane = new THREE.Mesh(geometry1, vmaterial);
scene.add(plane);
plane.position.y = 1;

var curvature = 1;
var count = 0;
let pos = plane.geometry.getAttribute("position");
let pa = pos.array;
for (let i = 0; i < pa.length; i++) {
	if(i%3 === 2) {
		//console.log(count + " : " + i + " " + pa[i]);
		pa[i] += -Math.sin(count*.156)*curvature;
		count++;
		if(count>=pa.length/3/2) count=0;
	}
}
pos.needsUpdate = true;
plane.geometry.computeVertexNormals();

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry2, material2);
scene.add( cube );
cube.position.y = -1;


renderer.setAnimationLoop( function () {
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	//pos.needsUpdate = true;
	//plane.geometry.computeVertexNormals();
	//if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
		vctx.drawImage( video, 0, 0 );
		if ( vtexture ) vtexture.needsUpdate = true;
	//}

	//if(renderer.xr.isPresenting()) 
	controls.update();
	
	renderer.render( scene, camera );
} );