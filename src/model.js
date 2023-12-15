import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
function model3d() {
  let container = document.querySelector(".matteo__valentino");
  // camera
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    70,
    100000
  );
  camera.position.set(0, 0, 200);

  // scene
  const scene = new THREE.Scene();
  const light = new THREE.AmbientLight(0x404040, 50); // soft white light
  scene.add(light);
  // renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    setClearAlpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setAnimationLoop(animate);
  container.appendChild(renderer.domElement);

  // Instantiate a loader
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://raw.githubusercontent.com/thematteov/3d-model/main/lib/");
  loader.setDRACOLoader(dracoLoader);
  let mainmesh;
  // Load a glTF resource
  loader.load(
    // resource URL
    "https://raw.githubusercontent.com/thematteov/3d-model/main/modelmy.glb",
    // called when the resource is loaded
    function (gltf) {
      mainmesh = gltf.scene.children[0];
      //   gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
      mainmesh.material.side = THREE.FrontSide;
      mainmesh.scale.set(230, 230, 230);
      mainmesh.position.set(0, -100, 0);
      scene.add(gltf.scene);
    }
  );

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
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate(time) {
    if(mainmesh){
        mainmesh.rotation.y = time*0.0006
    }
    controls.update();
    renderer.render(scene, camera);
  }
}
export default model3d;
