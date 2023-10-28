import Lenis from "@studio-freight/lenis";
import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";
import Lottie from "lottie-web";
import { event } from "jquery";

function initHome() {
  //////infinite banner

  gsap.to(".latest__banner", 20, {
    x: "-82.6em",
    ease: "linear",
    repeat: -1,
  });

  const text = new SplitType(".split");
  const char = new SplitType(".chars");
  text.lines;
  const elementsToWrap = document.querySelectorAll(".line");

  // Loop through the elements and wrap each one in a <span> with class "line-wrapper"
  elementsToWrap.forEach((element) => {
    const wrapper = document.createElement("span");
    wrapper.className = "line-wrapper";
    wrapper.style.overflowY = "hidden";
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
  });
  ///////SPLITTEXT

  let lines = document.querySelectorAll(".split");
  let chars = document.querySelectorAll(".chars");

  lines.forEach((value, index) => {
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
      value.querySelectorAll(".line"),
      1,
      { y: "100%", opacity: 1 },
      {
        y: "0%",
        opacity: 1,
        force3D: true,
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

  //home pill
  if (window.matchMedia("(max-width: 768px)").matches) {
    gsap.to(".latest_video", 1.2, {
      height: "50em",
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".home__first__section",
        start: "top top+=30%",
      },
    });
  } else {
    gsap.to(".latest_video", 1.2, {
      height: "25em",
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".home__first__section",
        start: "top top+=30%",
      },
    });
  }

  gsap.to(".detail__2", 1.2, {
    height: "8em",
    ease: "Power3.easeOut",
    scrollTrigger: {
      trigger: ".home__first__section",
      start: "top bottom-=20%",
    },
  });

  ScrollTrigger.create({
    trigger: ".home__first__section",
    start: "top top+=11%",
    end: "bottom top-=200%",
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
      start: "top top-=20%",
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
      start: "top top-=20%",
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
      start: "top top-=20%",
      end: () =>
        "+=" + document.querySelector(".our__values__wrapper").offsetWidth,
      pin: true,
      scrub: true,
      pinSpacing: false,
    },
  });

  const services = gsap.utils.toArray(".service__wrapper");

  services.forEach((service, index) => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      const tween = gsap.to(service, {
        scrollTrigger: {
          trigger: service,
          start: "bottom bottom",
          scrub: true,
          markers: false,
        },
        ease: "none",
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
      // Your mobile-specific JavaScript code here
    } else {
      // Code for non-mobile devices
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
    }
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
  //////enter animation

  let enterbtn = document.querySelector(".enter");
  //////preloader trigger
  enterbtn.addEventListener("click", () => {
    gsap.to(".preloader", 0, {
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
        1,
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

  //////SVG/////////////

  var connected = false;

  gsap.defaults({ ease: "elastic(2, 0.4)" });

  // Define the IDs and classes of the elements you want to apply the interaction to
  var elementSelectors = document.querySelectorAll(".linesvg");

  elementSelectors.forEach(function (selector) {
    var svg = selector;
    var path = svg.querySelector("#path");
    var svgRect = svg.getBoundingClientRect();
    var top = svgRect.top;
    var height = svgRect.height;
    var startY = height / 2;
    var p0 = { x: 0, y: startY };
    var p1 = { x: window.innerWidth / 2, y: startY };
    var p2 = { x: window.innerWidth, y: startY };
    var isInsideSVG = false; // Track if the mouse is inside the current SVG

    window.addEventListener("resize", () => {
      p0 = { x: 0, y: startY };
      p1 = { x: window.innerWidth / 2, y: startY };
      p2 = { x: window.innerWidth, y: startY };
      svgRect = svg.getBoundingClientRect();
      top = svgRect.top;
      height = svgRect.height;
      startY = height / 2;
    });
    window.addEventListener("scroll", () => {
      svgRect = svg.getBoundingClientRect();
      top = svgRect.top;
    });

    gsap.ticker.add(update);
    update();

    function update() {
      var d =
        "M" +
        p0.x +
        "," +
        p0.y +
        " Q" +
        p1.x +
        "," +
        p1.y +
        " " +
        p2.x +
        "," +
        p2.y;

      path.setAttribute("d", d);
    }

    svg.addEventListener("mouseenter", () => {
      isInsideSVG = true;
    });

    svg.addEventListener("mouseleave", () => {
      isInsideSVG = false;
      if (connected) {
        connected = false;
        gsap.to(p1, {
          duration: 1,
          x: window.innerWidth / 2,
          y: height / 2,
          onComplete: () => (connected = true),
        });
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (isInsideSVG) {
        if (p1.y > height * 0.9 || p1.y < -3) {
          if (connected) {
            connected = false;
            gsap.to(p1, {
              duration: 2,
              x: e.clientX,
              y: height / 2,
              onComplete: () => (connected = true),
            });
          }
        }
        if (!connected) {
          connected = true;
          gsap.killTweensOf(p1);
        }

        p1.x = e.clientX;
        p1.y = e.clientY - top;
      }
    });
  });

  /////lottie CURSOR
  let cursor = document.querySelector(".cursor");
  let cursorball = document.querySelector(".cursor__ball");
  // Define the Lottie animation configuration
  let animationConfig = Lottie.loadAnimation({
    container: cursor, // the dom element that will contain the animation
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://uploads-ssl.webflow.com/62eab1c2a6c3912f62c3d66c/653c6b59c0189b84bffc0edf_Animation%20-%201698458415832.json", // the path to the animation json
  });

  // Function to play the animation on hover
  function playAnimation() {
    animationConfig.setDirection(1);
    animationConfig.goToAndPlay(0, true);
    gsap.to(cursorball, 0.5, { scale: 0, ease: "Power2.easeOut" });
  }

  // Function to stop the animation on mouseout
  function stopAnimation() {
    animationConfig.setDirection(-1);
    if (animationConfig.currentFrame === animationConfig.totalFrames - 1) {
      animationConfig.goToAndStop(animationConfig.totalFrames, true);
    } else {
      animationConfig.goToAndPlay(30, true);
    }
    gsap.to(cursorball, 0.5, { scale: 1, ease: "Power2.easeOut" });
  }

  // Attach event listeners to the link
  const link = document.querySelectorAll("a");
  link.forEach((a) => {
    a.addEventListener("mouseover", playAnimation);
    a.addEventListener("mouseout", stopAnimation);
  });

  window.addEventListener("mousemove", (e) => {
    let X = e.clientX;
    let Y = e.clientY;
    gsap.to(cursor, 0.5, { x: X, y: Y, ease: "Power2.easeOut" });
    gsap.to(cursorball, 0.5, { x: X, y: Y, ease: "Power2.easeOut" });
  });
}

gsap.registerPlugin(ScrollTrigger);
export default initHome;
