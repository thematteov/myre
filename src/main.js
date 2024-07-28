import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initHome from "./pages/home";
import imagesLoaded from "imagesloaded";
import initProject from "./pages/project";
import model3d from "./general/model";
import cta from "./general/cta";
import barba from "@barba/core";
import { gsap } from "gsap/src";
import initabout from "./pages/about";
import SplitType from "split-type";

import initTest from "./test/test";
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
let lenis = new Lenis({
  lerp: 2,
  duration: 1.5,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
function split() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
  //->split text
  const text = new SplitType(".split");
  const textside = new SplitType(".split__side");
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

  let lines = document.querySelectorAll(".split");

  lines.forEach((value, index) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=15%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });
    tl.fromTo(
      value.querySelectorAll(".word"),
      0.8,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: "Power3.easeOut",
        stagger: {
          amount: 0.5,
          from: "random",
        },
      }
    );
  });
}
function splithorizontal() {
  let cahrsSlide = document.querySelectorAll(".splitx");
  new SplitType(".splitx");
  const elementsToWrap = document.querySelectorAll(".splitx .char");
  gsap.set(elementsToWrap, { x: "-150%" });

  elementsToWrap.forEach((element) => {
    const wrapper = document.createElement("span");
    wrapper.className = "char__wrapper";
    wrapper.style.overflow = "hidden";
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
  });

  cahrsSlide.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=10%",
        end: "bottom center",
        toggleActions: "play none none reverse",
        markers: false,
        scrub: true,
      },
    });
    tl.to(value.querySelectorAll(".char"), 1, {
      x: "0%",
      ease: "Power2.out",
      stagger: 0.02,
    });
  });
}
if (isMobile()) {
  // Your mobile-specific JavaScript code here
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
} else {
  // Code for non-mobile devices
  window.addEventListener("resize", () => {
    ScrollTrigger.update();
  });
}

imagesLoaded(document.querySelectorAll("img"), function () {
  window.scrollTo(0, 0);
  lenis.scrollTo(-lenis.progress, { immediate: true });
  // gsap.to(".tpclmn", 1, {
  //   scaleY: 0,
  //   stagger: 0.1,
  //   ease: "power2.inOut",
  //   onComplete: ()=> gsap.set('.tpreloader', {display: 'none'})
  // });
  gsap.to(".preloaderi", 1.2, {
    scaleX: 0,
    xPercent: 100,
    ease: "power2.inOut",
  });
  // setTimeout(() => {
  //   ScrollTrigger.refresh();
  // }, 500);
  // model3d()
  initHome();
  // initProject()
  // initabout()
  cta();
  // initTest()
  split();
  splithorizontal();

  console.log("all images are loaded");
});

/////////////////////////barba js
async function pagetranIn() {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.fromTo(
      ".page__transition",
      1,
      {
        y: "100vh",
      },
      {
        y: "200vh",
        ease: "Power3.easeInOut",
      }
    );
  });
}
async function pagetranOut() {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.fromTo(
      ".page__transition",
      1,
      {
        y: "0vh",
      },
      {
        y: "100vh",
        ease: "Power3.easeInOut",
      }
    );
  });
}
/////////////////BARBA
function pageTransition() {
  let lenis = new Lenis({
    lerp: 0.1,
    duration: 0.7,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.55,
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
            initInterior();
            ScrollTrigger.refresh();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          window.scrollTo(0, 0);
          ScrollTrigger.revert();
          window.onbeforeunload = function () {
            window.scrollTo(0, 0);
            lenis.scrollTo(-lenis.progress, { immediate: true });
          };
          lenis.scrollTo(-lenis.progress, { immediate: true });
        },
      },
      {
        namespace: "archive",
        afterEnter() {
          inteirorarchive();
          setTimeout(() => {
            inteirorarchive();
            ScrollTrigger.refresh();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          window.scrollTo(0, 0);
          ScrollTrigger.revert();
          window.onbeforeunload = function () {
            window.scrollTo(0, 0);
            lenis.scrollTo(-lenis.progress, { immediate: true });
          };
          lenis.scrollTo(-lenis.progress, { immediate: true });
        },
      },
    ],
  });
}
// pageTransition();
gsap.registerPlugin(ScrollTrigger);
