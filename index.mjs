import ThreeGlobe from "https://esm.sh/three-globe?external=three";
import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js?external=three";

const RENDER_GLOBE_DOM_ELEMENT_ID = "render-globe";

// prettier-ignore
const Globe = new ThreeGlobe()
	.hexPolygonsData(GLOBE_DATA.features)
	.hexPolygonResolution(3)
	.hexPolygonMargin(0.7)
	.showAtmosphere(true)
	.atmosphereColor("#3a228a")
	.atmosphereAltitude(0.25)
	.hexPolygonColor(() => "#ffffff");

const globeMaterial = Globe.globeMaterial();
globeMaterial.color = new THREE.Color(0x3a228a);
globeMaterial.emissive = new THREE.Color(0x220038);
globeMaterial.emissiveIntensity = 0.1;
globeMaterial.shininess = 0.7;

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById(RENDER_GLOBE_DOM_ELEMENT_ID).appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
scene.background = new THREE.Color(0x040d21);

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 250;

// Setup light sources
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-800, 2000, 400);

const dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
dLight1.position.set(-200, 500, 200);

const pointLight = new THREE.PointLight(0x8566cc, 0.5);
pointLight.position.set(-200, 500, 200);

// Add light sources to camera
camera.add(directionalLight);
camera.add(dLight1);
//camera.add(pointLight);

scene.add(camera);
scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

// Orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
/*** DISABLE ABILITY TO ZOOM */
orbitControls.enableZoom = false;

scene.add(Globe);

// Kick-off renderer
(function animate() {
	orbitControls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
})();
