import ThreeGlobe from "https://esm.sh/three-globe?external=three";
import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js?external=three";

const RENDER_GLOBE_DOM_ELEMENT_ID = "render-globe";

/**
 * Animation function to start animating our program.
 * @param {OrbitControls} orbitControls 
 * @param {THREE.WebGLRenderer} renderer 
 * @param {THREE.Scene} scene 
 * @param {THREE.PerspectiveCamera} camera 
 */
function animate(orbitControls, renderer, scene, camera) {
	requestAnimationFrame(() => animate(orbitControls, renderer, scene, camera));
	orbitControls.update();
	renderer.render(scene, camera);
}

// Create Globe
const Globe = new ThreeGlobe({
	waitForGlobeReady: true,
	animateIn: true,
});

// Add Globe properties
Globe
	.hexPolygonsData(GLOBE_DATA.features)
	.hexPolygonResolution(3)
	.hexPolygonMargin(0.7)
	.showAtmosphere(true)
	.atmosphereColor("#3a228a")
	.atmosphereAltitude(0.25)
	.hexPolygonColor(() => "#ffffff");

// Add material to globe
const globeMaterial = Globe.globeMaterial();
globeMaterial.color = new THREE.Color(0x3a228a);
globeMaterial.emissive = new THREE.Color(0x220038);
globeMaterial.emissiveIntensity = 0.1;
globeMaterial.shininess = 0.9;

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup camera light sources
const mainDirectionalCameraLight = new THREE.DirectionalLight(0xffffff, 8);
mainDirectionalCameraLight.position.set(-800, 2000, 400);

const secondaryDirectionalCameraLight = new THREE.DirectionalLight(0x7982f6, 8.2);
secondaryDirectionalCameraLight.position.set(-200, 500, 200);

const pointCameraLight = new THREE.PointLight(0x8566cc, 4.1);
pointCameraLight.position.set(-200, 500, 200);

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.position.z = 400;
camera.position.x = 0;
camera.position.y = 0;
camera.add(mainDirectionalCameraLight);
camera.add(secondaryDirectionalCameraLight);
camera.add(pointCameraLight);
camera.updateProjectionMatrix();

// Setup scene light sources
const ambientSceneLight = new THREE.AmbientLight(0xbbbbbb, 0.3);

// Setup scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040d21);
scene.fog = new THREE.Fog(0x535ef3, 400, 2000);
scene.add(ambientSceneLight);
scene.add(Globe);
scene.add(camera);

// Orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
/*** DISABLE ABILITY TO ZOOM */
orbitControls.enableZoom = false;

// Add renderer to DOM
document.getElementById(RENDER_GLOBE_DOM_ELEMENT_ID).appendChild(renderer.domElement);

// Begin animation
animate(orbitControls, renderer, scene, camera);
