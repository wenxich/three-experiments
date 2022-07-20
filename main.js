import './style.css'

import * as THREE from 'three';
import * as dat from 'dat.gui';

//DAT.GUI SLIDERS

//create a gui object to use dat.gui
const gui = new dat.GUI();
const world = {
    plane: {
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10
    }
}

//dat.gui - WIDTH
gui.add(world.plane, 'width', 1, 20).onChange(generatePlane);

//dat.gui - HEIGHT
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane);

//dat.gui - WIDTH
gui.add(world.plane, 'widthSegments', 1, 20).onChange(generatePlane);

//dat.gui - HEIGHT
gui.add(world.plane, 'heightSegments', 1, 20).onChange(generatePlane);

function generatePlane() {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
    );

    const {array} = planeMesh.geometry.attributes.position;

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

//makes what's in front of the black screen visible
camera.position.z = 5;

//add a plane
//parameters: width, height, widthSegments, heightSegments
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);

//won't see anything unless you create a mesh, so create a mesh + object

//MeshPhongMaterial adds lighting to plane in comparison to MeshBasicMaterial
const planeMaterial = new THREE.MeshPhongMaterial(
    {
        //colors: https://libxlsxwriter.github.io/working_with_colors.html
        color:0x800000,

        side: THREE.DoubleSide,

        //make vertices visible
        flatShading: THREE.FlatShading
    });

//adds the mesh to the scene
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(planeMesh);

console.log(planeMesh.geometry.attributes.position);

const {array} = planeMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i+=3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    //randomizing z position to add depth/jaggedness to plane
    array[i + 2] = z + Math.random();
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
    planeMesh.rotation.x += 0.01;
}

//call the recursive function
animate();