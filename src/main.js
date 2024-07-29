import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import initHome from "./pages/home";
import menu from "./general/menu";
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

function split() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());

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

  lines.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=15%",
        toggleActions: "play none none reset",
        markers: false,
      },
    });
    tl.fromTo(
      value.querySelectorAll(".word"),
      1.2,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: "Power3.easeOut",
        stagger: {
          amount: 0.8,
          from: "random",
        },
      }
    );
  });
}

function splitMOBILE() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());

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

  lines.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=5%",
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
        stagger: 0.05,
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
function reinitializeGeneral() {
  gsap.set(".menuwrapper", {
    display: "none",
  });
  cta();
  let videos = document.querySelectorAll("video");

  if (document.querySelector("video")) {
    videos.forEach((video) => {
      video.play();
    });
  }
  splithorizontal();
  if (isMobile()) {
    splitMOBILE();
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
  } else {
    split();
    window.addEventListener("resize", () => {
      ScrollTrigger.update();
    });
  }
}

async function pagetranIn(current) {
  return new Promise((resolve) => {
    let tl = gsap.timeline({
      onComplete: resolve,
    });
    tl.fromTo(
      ".page__transition",
      1,
      {
        width: "100vw",
        x: "0vw",
      },
      {
        width: "0vw",
        x: "100vw",
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
        width: "0vw",
        x: "0vw",
      },
      {
        width: "100vw",
        x: "0vw",
        ease: "Power3.easeInOut",
      }
    );
  });
}

function reinitializeWebflow() {
  Webflow.ready(); // Re-trigger Webflow ready event
  Webflow.require("ix2").init(); // Reinitialize interactions
}

function reattachFormSubmitHandler() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Form submitted!");
      // Handle form submission
      // Example: Use fetch or XMLHttpRequest to submit form data
    });
  } else {
    console.log("Form not found");
  }
}

function resetScroll() {
  window.scrollTo(0, 0);
  ScrollTrigger.revert();
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
    lenis.scrollTo(-lenis.progress, { immediate: true });
  };
  lenis.scrollTo(-lenis.progress, { immediate: true });
}

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
        async after({ current }) {
          const done = this.async();
          await pagetranIn(current);
          done();
        },
        async enter() {
          reinitializeGeneral();
          reinitializeWebflow();
        },
        async once() {
          reinitializeGeneral();
          reinitializeWebflow();
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
            ScrollTrigger.refresh();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          menu();
          resetScroll();
        },
      },
      {
        namespace: "about",
        afterEnter() {
          ScrollTrigger.refresh();
          setTimeout(() => {
            initabout();
            ScrollTrigger.refresh();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          menu();
          resetScroll();
        },
      },
      {
        namespace: "project",
        afterEnter() {
          ScrollTrigger.refresh();
          setTimeout(() => {
            initProject();
            ScrollTrigger.refresh();
            // console.clear();
          }, 1);
        },
        beforeEnter() {
          menu();
          resetScroll();
        },
      },
    ],
  });
}

pageTransition();
reattachFormSubmitHandler(); // Initial call to attach form submit handler

gsap.registerPlugin(ScrollTrigger);
