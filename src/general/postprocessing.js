import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { VignetteShader } from "three/addons/shaders/VignetteShader.js";

function three() {
  let camera, scene, renderer, composer;
  let grainEffect, vignetteEffect;

  init();
  animate();

  function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 900;
    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(window.innerWidth, window.innerHeight, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xfcf6f2,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.querySelector(".canvas").appendChild(renderer.domElement);

    // Grain effect
    grainEffect = new FilmPass(0.4, true);

    // Vignette effect
    vignetteEffect = new ShaderPass(VignetteShader);
    vignetteEffect.uniforms["offset"].value = 1.; // Adjust to control the vignette spread
    vignetteEffect.uniforms["darkness"].value = .4; // Adjust to control the vignette darkness

    // Composer for post-processing
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(grainEffect);
    composer.addPass(vignetteEffect); // Add vignette effect after grain effect

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);
    composer.render();
  }
}

export default three;