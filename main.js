import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000); //field of view (degrees), aspect ratio (fraction) + 2 clipping planes
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);

//tell three.js the pixel ratio so the graphics are supported on browsers with different displays
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement); //insert this into body

//parameters: width, height, depth, widthSegments, heightSegments, depthSegments
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

//won't see anything unless you create a mesh, so create a mesh + object

//colors: https://libxlsxwriter.github.io/working_with_colors.html
const boxMaterial = new THREE.MeshBasicMaterial(
    {color:0xC0C0C0});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

//adds the mesh to the scene
scene.add(boxMesh);

//makes what's in front of the black screen visible
camera.position.z = 5;

//add a plane
//parameters: width, height, widthSegments, heightSegments
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);

//add lighting to plane
const planeMaterial = new THREE.MeshPhongMaterial(
    {color:0x800000, side: THREE.DoubleSide});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(planeMesh);

console.log(planeMesh.geometry.attributes.position);

const {array} = planeMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i+=3) {
    const x = array[i];
    const y = array[i+1];
    const z = array[i+2];
}

//parameters: color, intensity
const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(0, 0, 1);
scene.add( light );

//renders it all
renderer.render(scene, camera);

//add an animation

//create recursive function to keep updating the animation (???????????????)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    boxMesh.rotation.x += 0.01;
    boxMesh.rotation.y += 0.01;
    planeMesh.rotation.x += 0.01;
}

//call the recursive function
animate();