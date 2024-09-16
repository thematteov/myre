import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import initHome from "./pages/home";
import menu from "./general/menu";
import initProject from "./pages/project";
import cta from "./general/cta";
import barba from "@barba/core";
import { gsap } from "gsap/all";
import initabout from "./pages/about";
import preloader from "./general/preloader";
import product from "./pages/product";
preloader();
gsap.registerPlugin(ScrollTrigger);
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
if (isMobile()) {
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}
function handleScrollTrigger() {
  if (isMobile()) {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
  } else {
    ScrollTrigger.refresh();
  }
}
function reinitializeGeneral() {
  if (document.querySelector(".menuwrapper")) {
    gsap.set(".menuwrapper", { display: "none" });
  }
  cta();
  let videos = document.querySelectorAll("video");
  if (videos.length > 0) {
    videos.forEach((video) => video.play());
  }
  handleScrollTrigger();
}
async function pagetranIn() {
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

async function pagetranOut() {
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
    lerp: 0.5,
    duration: 1.5,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
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
          reattachFormSubmitHandler();
        },
        async once() {
          reinitializeGeneral();
          reattachFormSubmitHandler();
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
      {
        namespace: "product",
        afterEnter() {
          ScrollTrigger.refresh();
          setTimeout(() => {
            product();
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
reattachFormSubmitHandler();
