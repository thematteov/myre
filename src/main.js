import barba from "@barba/core";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap/src";
import imagesLoaded from "imagesloaded";

import initProject from "./project";
import initHome from "./home";

const content = document.querySelector("img");
const imgLoad = new imagesLoaded(document);
let contentLoaded = false;

imgLoad.on("done", () => {
  contentLoaded = true;

  gsap.fromTo(
    ".preloader",
    1,
    { opacity: 1 },
    {
      opacity: 0,
      delay: 0.5,
      onComplete: () => {
        gsap.to(".preloader", { display: "none", delay: 0.5 });
      },
    }
  );
});

async function pagetranIn() {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.fromTo(
      ".transitiontext",
      0.6,
      {
        y: "0%",
        opacity: 1,
      },
      {
        y: "100%",
        opacity: 0,
        ease: "Power3.easeInOut",
        stagger: 0.1,
      }
    );
    tl.to(".discover__playlist__text", 1.2, {
      width: "0vw",
      height: "0vh",
      ease: "Power3.easeInOut",
      delay: -1,
    });
    tl.to("a", 0, {
      pointerEvents: "all",
      delay: 0.8,
    });
  });
}
async function pagetranOut(next) {
  const transitionText = document.querySelector("#transitiontext");
  if (transitionText) {
    setTimeout(() => {
      transitionText.textContent = next.namespace;
    }, 1);
  }
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.to("a", 0, {
      pointerEvents: "none",
    });
    if (window.matchMedia("(max-width: 768px)").matches) {
      tl.to(".discover__playlist__text", 1.2, {
        width: "70em",
        height: "70em",
        ease: "Power3.easeInOut",
      });
      // Your mobile-specific JavaScript code here
    } else {
      // Code for non-mobile devices
      tl.to(".discover__playlist__text", 1.2, {
        width: "30em",
        height: "30em",
        ease: "Power3.easeInOut",
      });
    }
    tl.fromTo(
      ".transitiontext",
      0.6,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        delay: -1,
        ease: "Power3.easeInOut",
        stagger: 0.1,
      }
    );
    tl.to(".discover__playlist__text", 1.2, {
      width: "500em",
      height: "500em",
      ease: "Power3.easeInOut",
    });
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
            console.clear();
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
          setTimeout(() => {
            initProject();
            console.clear();
          }, 50);
          ScrollTrigger.refresh();
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
