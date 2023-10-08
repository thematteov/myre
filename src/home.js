import Lenis from "@studio-freight/lenis";
import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initHome() {
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
  let g = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    y = window.innerWidth <= 980,
    h = window.matchMedia("(max-width: 768px)");
  if (!g || !y || !h.matches) {
  }

  ///////NAV LOGO SCRUB
  let logoTl = gsap.timeline({});
  logoTl.set(".logo__svg", { transformOrigin: "50% 0%" });
  logoTl.fromTo(
    ".logo__svg",
    1.2,
    { scale: 1 },
    {
      scale: 0.8,
      transformOrigin: "100 50",
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".logo__svg",
        start: "top top",
        pin: true,
        scrub: true,
      },
    }
  );


  ////////////infinite banner
  let banner = gsap.timeline({repeat: -1,});
  banner.to(".hero__title", 25, {x: "-84em", ease: "linear"})
  banner.to(".hero__title", 0, {x: "-0em",ease: "linear"})
  ////////////infinite banner//////////////
  
  const services = gsap.utils.toArray(".service");

  services.forEach((service, index) => {
    const tween = gsap.to(service, {
      scrollTrigger: {
        trigger: service,
        start: () => `top bottom-=100`,
        end: () => `bottom bottom`,
        scrub: true,
        markers: false,
      },
      ease: "none",
      opacity: () => 1 - (services.length - index) * 0.02,
    });

    ScrollTrigger.create({
      trigger: service,
      start: "bottom bottom",
      pin: true,
      pinSpacing: false,
      markers: false,
      id: "pin",
      endTrigger: services.length,
      end: "max",
    });
  });
  ScrollTrigger.create({
    trigger: ".why__us__section",
    start: "bottom bottom",
    pin: true,
    pinSpacing: false,
    markers: false,
  });
  ScrollTrigger.create({
    trigger: ".services__left__inner",
    start: "top top",
    pin: true,
    pinSpacing: false,
    markers: false,
  });
  ScrollTrigger.create({
    trigger: ".latest__project__review",
    start: "top top",
    pin: true,
    pinSpacing: false,
    markers: false,
  });
  ///////SPLITTEXT
  const text = new SplitType(".split");
  const char = new SplitType(".chars");
  text.lines;

  let lines = document.querySelectorAll(".split");
  let chars = document.querySelectorAll(".chars");

  lines.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=10%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      value.querySelectorAll(".line"),
      0.8,
      { y: "50%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.1,
      }
    );
  });
  chars.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=30%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      value.querySelectorAll(".char"),
      0.01,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.05,
      }
    );
  });


  //////LINKS

  let links = gsap.utils.toArray("a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link.querySelector(".cta__block"), 0.5, {
        x: "100%",
        ease: "Power2.easeOut",
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link.querySelector(".cta__block"), 0.5, {
        x: "0%",
        ease: "Power2.easeOut",
      });
    });
  });
  /////////orange square clients
  let tlSQR = gsap.timeline({
      scrollTrigger: {
          trigger: ".fourth__section",
          start: "bottom bottom",
          toggleActions: "play none none reverse",
          markers: false
        },
  });
  tlSQR.fromTo(
    ".white",
    1.2,
    { scale: 0 },
    { scale: 1, ease: "Power3.easeOut", delay: 0 }
  );
  tlSQR.fromTo(
    ".black",
    1.2,
    { scale: 0 },
    {
      scale: 1,
      ease: "Power3.easeOut",
      delay: -0.7,
    }
  );
  tlSQR.fromTo(
    ".orange",
    1.2,
    { scale: 0 },
    {
      scale: 1,
      ease: "Power3.easeOut",
      delay: -0.8,
    }
  );
}

gsap.registerPlugin(ScrollTrigger);
export default initHome;