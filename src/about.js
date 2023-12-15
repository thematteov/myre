import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";
import SplineLoader from "@splinetool/loader";
// import model3d from "./model";

function initAbout() {
  let startaprj = gsap.timeline({ repeat: -1 });

  startaprj.fromTo(
    ".startaprj__track",
    5,
    { x: "0em" },
    {
      x: "-11.4em",
      ease: "none",
    }
  );
  //////infinite banner
  const text = new SplitType(".split");
  const textside = new SplitType(".split__side");
  const char = new SplitType(".chars");
  text.lines;
  textside.lines;
  const elementsToWrap = document.querySelectorAll(".line");

  elementsToWrap.forEach((element) => {
    const wrapper = document.createElement("span");
    wrapper.className = "line-wrapper";
    wrapper.style.overflowY = "hidden";
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
  });
  ///////SPLITTEXT

  let lines = document.querySelectorAll(".split");
  let chars = document.querySelectorAll(".chars");

  lines.forEach((value, index) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=10%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });
    tl.fromTo(
      value.querySelectorAll(".line"),
      1,
      { y: "100%", opacity: 1 },
      {
        y: "0%",
        opacity: 1,
        force3D: true,
        ease: "Power2.easeOut",
        stagger: 0.1,
      }
    );
  });

  //////page animations
  if (window.matchMedia("(max-width: 768px)").matches) {
    gsap.to(".about__hero__content", {
      y: "-30em",
      scrollTrigger: { scrub: true },
      ease: "none",
    });
  } else {
    //////navigation
    gsap.to(".home__nav", 1, {
      y: "0em",
      scrollTrigger: {
        pin: ".home__nav",
        pinSpacing: true,
        start: "top top",
        end: "max",
      },
    });
    gsap.to(".about__hero__content", {
      y: "-40em",
      scrollTrigger: { scrub: true },
      ease: "none",
    });
  }

  let processPhases = document.querySelectorAll(".process__wrapper");

  processPhases.forEach((phase) => {
    gsap.fromTo(
      phase,
      1,
      { yPercent: 20, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: phase,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  //////general
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());

  // model3d()
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
gsap.registerPlugin(ScrollTrigger);
export default initAbout;
