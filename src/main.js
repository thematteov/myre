import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import initHome from "./pages/home";
import initProject from "./pages/project";
import initAbout from "./pages/about";
import initContact from "./pages/contact";
import preloader from "./general/preloader";
import cta from "./general/cta";
window.scrollTo(0, 0)
preloader()
cta()
let lenis = new Lenis({
  lerp: 0.1,
  duration: 1,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.65,
  touchMultiplier: 0.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
if (window.matchMedia("(max-width: 768px)").matches) {
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
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "home"
) {
  initHome();
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "about"
) {
  initAbout();
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "contact"
) {
  initContact();
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "contact"
) {
  initHome();
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "project"
) {
  initProject();
}