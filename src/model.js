import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import SplineLoader from "@splinetool/loader";
function model3d() {
  let container = document.querySelector(".matteo__valentino");
  // camera

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    70,
    100000
  );
  camera.position.set(0, 0, 10000);

  // scene
  const scene = new THREE.Scene();
  let spline;
  // spline scene
  const loader = new SplineLoader();
  loader.load(
    "https://prod.spline.design/nbBMcfIKCGNqNCBF/scene.splinecode",
    (splineScene) => {
      splineScene.children[0].children[1].scale.set(1.5, 1.5, 1.5);
      splineScene.children[0].children[1].position.set(0, 0, 0);
      scene.add(splineScene);
      spline = splineScene;
    }
  );
  if (spline) {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 100000);
    scene.add(directionalLight);
    const targetObject = spline.children[0].children[1];
    scene.add(targetObject);
    directionalLight.target = targetObject;
  }

  // renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    setClearAlpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setAnimationLoop(animate);
  container.appendChild(renderer.domElement);

  // scene settings
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  renderer.clearColor(0x000000, 0);
  renderer.setClearAlpha(0);

  // orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.125;
  controls.minPolarAngle = Math.PI / 4; // radians (looking straight down)
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;

  window.addEventListener("resize", onWindowResize);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate(time) {
    if (spline) {
      spline.children[0].children[1].rotation.y = time * 0.0006;
    }
    controls.update();
    renderer.render(scene, camera);
  }
}
export default model3d;
