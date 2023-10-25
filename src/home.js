import Lenis from "@studio-freight/lenis";
import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";
import { easing } from "jquery";

function initHome() {
  //////infinite banner

  gsap.to(".latest__banner", 20, {
    x: "-82.6em",
    ease: "linear",
    repeat: -1
  });

  const text = new SplitType(".split");
  const char = new SplitType(".chars");
  text.lines;

  ///////SPLITTEXT

  let lines = document.querySelectorAll(".split");
  let chars = document.querySelectorAll(".chars");

  lines.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=10%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });
    tl.fromTo(
      value.querySelectorAll(".word"),
      1,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.05,
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
      1,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.05,
      }
    );
  });

  ///////////////

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

  //home pill
  let logoTl = gsap.timeline({});
  logoTl.fromTo(
    ".home__project__pill__wrapper",
    { scale: 1, opacity: 1 },
    {
      scale: 0.8,
      opacity: 0.8,
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".home__project__pill__wrapper",
        start: "bottom bottom-=10%",
        scrub: true,
      },
    }
  );
  logoTl.to(".videointroduction", {
    y: "-20%",
    // ease: "Power3.easeOut",
    scrollTrigger: {
      trigger: ".home__project__pill__wrapper",
      start: "bottom bottom",
      scrub: true,
    },
  });

  ScrollTrigger.create({
    trigger: ".home__first__section",
    start: "top top",
    end: "bottom top-=200%",
    pin: true,
    pinSpacing: false,
  });
  ScrollTrigger.create({
    trigger: ".hero__lst__prj__info__panel",
    start: "bottom bottom",
    end: "bottom top-=100%",
    pin: true,
    pinSpacing: false,
  });
  ScrollTrigger.create({
    trigger: ".hey__section",
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
  });
  gsap.to(".cover", {
    x: "-25%",
    ease: "none",
    scrollTrigger: {
      trigger: ".how__section",
      start: "top top",
      end: () =>
        "+=" + document.querySelector(".our__values__wrapper").offsetWidth,
      pin: true,
      scrub: true,
      pinSpacing: false,
    },
  });
  gsap.to(".our__values__wrapper", {
    x: "-83.5%",
    ease: "none",
    scrollTrigger: {
      trigger: ".how__section",
      start: "top top",
      end: () =>
        "+=" + document.querySelector(".our__values__wrapper").offsetWidth,
      pin: true,
      scrub: true,
      pinSpacing: false,
    },
  });
  gsap.to(".gallery", {
    x: "83.5%",
    ease: "none",
    scrollTrigger: {
      trigger: ".how__section",
      start: "top top",
      end: () =>
        "+=" + document.querySelector(".our__values__wrapper").offsetWidth,
      pin: true,
      scrub: true,
      pinSpacing: false,
    },
  });

  const services = gsap.utils.toArray(".service__wrapper");

  services.forEach((service, index) => {
    const tween = gsap.to(service, {
      scrollTrigger: {
        trigger: service,
        start: "top top+=10%",
        end: "bottom bottom",
        scrub: true,
        markers: false,
      },
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: service,
      start: "top top+=20%",
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

  //////text count up
  var konditionen = gsap.timeline({
    scrollTrigger: {
      trigger: ".how__section",
      start: "top top+=10%",
    },
    ease: "none",
  });
  konditionen.from(
    ".number__counting h1",
    {
      duration: 200,
      ease: "none",
      innerText: 0,
      roundProps: "innerText",
      onUpdate: function () {
        this.targets().forEach((target) => {
          const val = gsap.getProperty(target, "innerText");
          target.innerText = numberWithCommas(val);
        });
      },
    },
    "<"
  );

  function numberWithCommas(n) {
    var parts = n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //////enter animation

  let enterbtn = document.querySelector(".enter");
  //////preloader trigger
  enterbtn.addEventListener("click", () => {
    gsap.to(".preloader", 1.2, {
      opacity: 0,
      ease: "Power2.easeOut",
    });
    gsap.to(".preloader", 0, {
      display: "none",
      delay: 1.2,
    });

    let music = document.querySelector("audio");
    music.volume = 0.2;
    music.play();

    ///////NAV LOGO SCRUB
    let introTl = gsap.timeline();
    introTl.set(".logo__svg", { transformOrigin: "0 50" });
    introTl.fromTo(
      ".logo__svg",
      1.5,
      { height: "50em" },
      {
        height: "4em",
        delay: 0.5,
        transformOrigin: "0 50",
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: ".logo__svg",
        },
      }
    );

    const text = new SplitType(".splitfirst");
    text.lines;

    ///////SPLITTEXT

    let lines = document.querySelectorAll(".splitfirst");

    lines.forEach((value) => {
      gsap.fromTo(
        value.querySelectorAll(".word"),
        1.2,
        { y: "70%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "Power3.easeOut",
          stagger: 0.05,
          delay: 1,
        }
      );
    });
    introTl.fromTo(
      ".index__line",
      1.2,
      { width: "0vw" },
      {
        width: "100vw",
        ease: "Power3.easeOut",
        stagger: 0.05,
        delay: 0,
      }
    );
    introTl.fromTo(
      ".index__i",
      1.2,
      { y: "70%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power3.easeOut",
        stagger: 0.05,
        delay: -0.5,
      }
    );
    introTl.fromTo(
      ".image__me",
      1.2,
      { height: "0em" },
      {
        height: "5.63em",
        ease: "Power3.easeOut",
        delay: -1,
      }
    );
  });

  let image = document.querySelector(".image__me");

  image.addEventListener("mouseenter", () => {
    gsap.to(".image__me", 0, { overflow: "visible", zIndex: 9 });
  });
  image.addEventListener("mouseout", () => {
    gsap.to(".image__me", 0, { overflow: "hidden", zIndex: 9 });
  });
}

gsap.registerPlugin(ScrollTrigger);
export default initHome;
