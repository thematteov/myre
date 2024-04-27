import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import initHome from "./pages/home";
import initProject from "./pages/project";
import initAbout from "./pages/about";
import initContact from "./pages/contact";
import preloader from "./general/preloader";
import cta from "./general/cta";
import initNewsletter from "./pages/newsletter";
window.scrollTo(0, 0)
function smooth(){
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
}
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
  preloader()
cta()
smooth()
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "about"
) {
  initAbout();
  preloader()
cta()
smooth()
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "contact"
) {
  initContact();
  preloader()
cta()
smooth()
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "contact"
) {
  initHome();
  preloader()
cta()
smooth()
}
if (
  document
    .querySelector(".pagewrapper")
    .getAttribute("data-barba-namespace") === "project"
) {
  initProject();
  preloader()
cta()
smooth()
}
if (
  document
    .querySelector("body")
    .getAttribute("data-barba-namespace") === "newsletter"
) {
  initNewsletter();
}