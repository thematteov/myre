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
    tl.to(".page__transition", 1.2, {
      width: "0vw",
      ease: "Power3.easeOut",
      delay: 0.3,
    });
  });
}
async function pagetranOut(next) {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.set(".page__transition", {
      width: "100vw",
      height: "0vh",
    });
    tl.set(".icon__black", { y: "-100vh" });
    tl.to(".page__transition", 1.2, {
      height: "100vh",
      ease: "Power3.easeOut",
    });
    tl.fromTo(
      ".icon__black",
      1.5,
      { y: "-100vh", rotateZ: 0 },
      {
        y: "45vh",
        rotateZ: 90,
        ease: "Bounce.easeOut",
        delay: -1,
      }
    );
  });
}
/////////////////BARBA
function pageTransition() {
  let lenis;
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
            lenis = new Lenis({
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
            lenis = new Lenis({
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
            initProject();
            console.clear();
            ScrollTrigger.refresh();
          }, 1);
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
