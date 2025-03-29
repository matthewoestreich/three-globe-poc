import ThreeGlobe from "https://esm.sh/three-globe?external=three";
import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js?external=three";

const RENDER_GLOBE_DOM_ELEMENT_ID = "render-globe";

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById(RENDER_GLOBE_DOM_ELEMENT_ID).appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
scene.background = new THREE.Color(0x040d21);

// Setup camera
const camera = new THREE.PerspectiveCamera();

// Setup light sources
const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
directionalLight.position.set(-800, 2000, 400);

const dLight1 = new THREE.DirectionalLight(0x7982f6, 8.2);
dLight1.position.set(-200, 500, 200);

const pointLight = new THREE.PointLight(0x8566cc, 4.1);
pointLight.position.set(-200, 500, 200);

// Orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
/*** DISABLE ABILITY TO ZOOM */
orbitControls.enableZoom = false;

// Add camera properties
camera.add(directionalLight);
camera.add(dLight1);
camera.add(pointLight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.position.z = 400;
camera.position.x = 0;
camera.position.y = 0;
camera.updateProjectionMatrix();

// Add camera to scene
scene.add(camera);
scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

// prettier-ignore
const Globe = new ThreeGlobe({
	waitForGlobeReady: true,
	animateIn: true,
});

Globe
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
globeMaterial.shininess = 0.9;

scene.add(Globe);

function animate() {
	orbitControls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();
