import barba from "@barba/core";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap/src";
import Lottie from "lottie-web";
// import imagesLoaded from "imagesloaded";

import initHome from "./home";
import initProject from "./project";

//////preloader progression animation
window.addEventListener("load", () => {
  const pageEnd = performance.now(); // Get the time when the page finishes loading
  const loadTime = (pageEnd - performance.timing.navigationStart) / 1000; // Calculate the page load time in seconds
  console.log(`Page loaded in ${loadTime} seconds.`);
});
if (window.matchMedia("(max-width: 768px)").matches) {
} else {
  //////percentage
  //////page progresssion

  let progressBar = document.querySelector(".percentage__number");

  function updateProgressBar() {
    let windowHeight = window.innerHeight;
    let pageHeight = document.documentElement.scrollHeight - windowHeight;
    let scrollPosition = window.scrollY;
    let scrollProgress = (scrollPosition / pageHeight) * 100;
    progressBar.textContent = `Your Progress: ${scrollProgress.toFixed(2)}%`;
  }

  updateProgressBar();

  window.addEventListener("scroll", updateProgressBar);
  window.addEventListener("resize", updateProgressBar);
  /////lottie CURSOR
  let cursor = document.querySelector(".cursor");
  let cursorball = document.querySelector(".cursor__ball");
  // Define the Lottie animation configuration
  let animationConfig = Lottie.loadAnimation({
    container: cursor, // the dom element that will contain the animation
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://uploads-ssl.webflow.com/62eab1c2a6c3912f62c3d66c/653c6b59c0189b84bffc0edf_Animation%20-%201698458415832.json", // the path to the animation json
  });

  // Function to play the animation on hover
  function playAnimation() {
    animationConfig.setDirection(1);
    animationConfig.goToAndPlay(0, true);
    gsap.to(cursorball, 0.5, { scale: 0, ease: "Power2.easeOut" });
  }

  // Function to stop the animation on mouseout
  function stopAnimation() {
    animationConfig.setDirection(-1);
    if (animationConfig.currentFrame === animationConfig.totalFrames - 1) {
      animationConfig.goToAndStop(animationConfig.totalFrames, true);
    } else {
      animationConfig.goToAndPlay(30, true);
    }
    gsap.to(cursorball, 0.5, { scale: 1, ease: "Power2.easeOut" });
  }

  // Attach event listeners to the link
  const link = document.querySelectorAll("a");
  link.forEach((a) => {
    a.addEventListener("mouseover", playAnimation);
    a.addEventListener("mouseout", stopAnimation);
  });

  window.addEventListener("mousemove", (e) => {
    let X = e.clientX;
    let Y = e.clientY;
    gsap.to(cursor, 0.5, { x: X, y: Y, ease: "Power2.easeOut" });
    gsap.to(cursorball, 0.5, { x: X, y: Y, ease: "Power2.easeOut" });
  });
}

const content = document.querySelector("img");

window.addEventListener("load", () => {
  gsap.to(".enter", 1.8, {
    y: "125.3vh",
    ease: "Bounce.easeOut",
    rotate: 90,
  });
  gsap.to(".logo__svg__preloader", 1.8, {
    opacity: 1,
    ease: "Power3.easeOut",
  });
});

if (window.matchMedia("(max-width: 768px)").matches) {
  // Your mobile-specific JavaScript code here
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // notice "resize" isn't in the list
  });
} else {
  // Code for non-mobile devices
  window.addEventListener("resize", () => {
    ScrollTrigger.update();
  });
}

async function pagetranIn() {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.fromTo(
      ".icon__black",
      1,
      {
        y: "50vh",
      },
      {
        y: "100vh",
        ease: "Power3.easeInOut",
      }
    );
    tl.fromTo(
      ".page__transition",
      1,
      {
        height: "100vh",
      },
      {
        height: "0vh",
        ease: "Power3.easeInOut",
      }
    );
  });
}
async function pagetranOut(next) {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.fromTo(
      ".page__transition",
      1,
      {
        height: "0vh",
      },
      {
        height: "100vh",
        ease: "Power3.easeInOut",
      }
    );
    tl.fromTo(
      ".icon__black",
      1,
      {
        y: "0vh",
      },
      {
        y: "50vh",
        ease: "bounce.out",
        delay: -0.6,
      }
    );
  });
}
/////////////////BARBA
function pageTransition() {
  let lenis = new Lenis({
    lerp: 0.1,
    duration: 1,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.3,
    touchMultiplier: 0.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  barba.init({
    transitions: [
      {
        async leave({ next }) {
          const done = this.async();
          await pagetranOut(next);
          done();
        },
        async after() {
          const done = this.async();
          await pagetranIn();
          done();
        },
      },
    ],
    views: [
      {
        namespace: "home",
        afterEnter() {
          ScrollTrigger.refresh();
          setTimeout(() => {
            initHome();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          ScrollTrigger.revert();
          window.onbeforeunload = function () {
            lenis.scrollTo(-lenis.progress, { immediate: true });
          };
          lenis.scrollTo(-lenis.progress, { immediate: true });
        },
      },
      {
        namespace: "project",
        afterEnter() {
          ScrollTrigger.refresh();
          setTimeout(() => {
            initProject();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          ScrollTrigger.revert();
          window.onbeforeunload = function () {
            lenis.scrollTo(-lenis.progress, { immediate: true });
          };
          lenis.scrollTo(-lenis.progress, { immediate: true });
        },
      },
    ],
  });
}
pageTransition();
