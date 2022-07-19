import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000); //field of view (degrees), aspect ratio (fraction) + 2 clipping planes
const renderer = new THREE.WebGLRenderer();

console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement); //insert this into body

const boxGeometry = new THREE.BoxGeometry(1, 1, 1); //width, height, depth

//won't see anything unless you create a mesh, so create a mesh + object
const material = new THREE.MeshBasicMaterial({color:0x00ff00});

console.log(boxGeometry);
console.log(material);

const mesh = new THREE.Mesh(boxGeometry, material);
console.log(mesh);

//adds the mesh to the scene
scene.add(mesh);

//makes what's in front of the black screen visible
camera.position.z = 5;

//renders it all
renderer.render(scene, camera);