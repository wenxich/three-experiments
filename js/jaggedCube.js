/** THIS IS A WORK IN PROGRESS **/

import '../style.css'

import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//DAT.GUI SLIDERS

//create a gui object to use dat.gui
const gui = new dat.GUI();
const world = {
    box: {
        width: 2,
        height: 2,
        depth: 2
    }
}

//dat.gui - WIDTH
gui.add(world.box, 'width', 1, 5).onChange(generateBox);

//dat.gui - HEIGHT
gui.add(world.box, 'height', 1, 5).onChange(generateBox);

//dat.gui - DEPTH
gui.add(world.box, 'depth', 1, 5).onChange(generateBox);

function generateBox() {
    boxMesh.geometry.dispose();
    boxMesh.geometry = new THREE.BoxGeometry(
        world.box.width,
        world.box.height,
        world.box.depth
    );

    const {array} = boxMesh.geometry.attributes.position;

    for (let i = 0; i < array.length; i+=3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];

        //randomizing z position to add depth/jaggedness to plane
        array[i + 2] = z + Math.random();
    }
}

//THREE.JS SCENE

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000); //field of view (degrees), aspect ratio (fraction) + 2 clipping planes
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);

//tell three.js the pixel ratio so the graphics are supported on browsers with different displays
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement); //insert this into body

//create new OrbitControls object
new OrbitControls(camera, renderer.domElement);

//makes what's in front of the black screen visible
camera.position.z = 5;

//add a box
//parameters: width, height, depth
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);

//won't see anything unless you create a mesh, so create a mesh + object

//MeshPhongMaterial adds lighting to plane in comparison to MeshBasicMaterial
const boxMaterial = new THREE.MeshPhongMaterial(
    {
        //colors: https://libxlsxwriter.github.io/working_with_colors.html
        color:0x800000,

        //make back visible
        side: THREE.DoubleSide,

        //make vertices making the plane visible
        flatShading: THREE.FlatShading
    });

//adds the mesh to the scene
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(boxMesh);

const {array} = boxMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i+=3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    //randomizing z position to add depth/jaggedness to plane
    array[i + 2] = z + Math.random();
}

//parameters: color, intensity
const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
frontLight.position.set(1, 1, 1);
scene.add( frontLight );

//parameters: color, intensity
const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(-1, -1, -1);
scene.add( backLight );

//renders it all
renderer.render(scene, camera);

//add an animation

//create recursive function to keep updating the animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //planeMesh.rotation.x += 0.01;
}

//call the recursive function
animate();