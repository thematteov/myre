import barba from "@barba/core";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap/src";
// import imagesLoaded from "imagesloaded";

import initHome from "./home";

const content = document.querySelector("img");

window.addEventListener('load', ()=>{
  gsap.to('.enter', 1.2, {
    y: "145vh",
    ease: 'Power3.easeOut',
    rotate: 90
  })
})

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
  
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.to("a", 0, {
      pointerEvents: "none",
    });
    
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
        namespace: "playlist",
        afterEnter() {
          setTimeout(() => {
            initPlaylist();
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
