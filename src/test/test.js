import { gsap } from "gsap/src";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function initTest() {
  let herochars = document.querySelectorAll(".thflex .char");
  new SplitType(".heroh12");
  new SplitType(".heroh11");

  gsap.fromTo(
    ".heroh11 .char",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2.5,
      ease: "power3.out",
      stagger: -0.1,
      delay: 2,
    }
  );
  gsap.fromTo(
    ".heroh12 .char",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2.5,
      ease: "power3.out",
      stagger: 0.1,
      delay: 2,
    }
  );
  gsap.from(".thimage", {
    width: "15em",
    height: "25em",
    ease: "power3.inOut",
    delay: 1.5,
    duration: 1.2
  });

  let tl = gsap.timeline({
    scrollTrigger: {
      scrub: true,
      start: "top top",
      end: () => `top top-=${best.getBoundingClientRect().height}`,
      trigger: ".thero",
      pin: ".thero",
      pinSpacing: false,
    },
  });
  let best = document.querySelector(".bestsellers");
  tl.to(".bestsellers", {
    y: () => {
      -(best.getBoundingClientRect().height - window.innerHeight * 0.5);
    },
  }).to(".bestsellers", {
    opacity: 1,
    duration: 0.5,
    delay: 0.2,
  });
  let bestsellingimg = document.querySelectorAll(".bsimg");
  bestsellingimg.forEach((img) => {
    gsap.to(img.querySelector(".bestsellerimg"), {
      y: "-10%",
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
  let backtopcircle = document.querySelector(".backtotopcircle");
  let arrowtop = document.querySelector(".arrowtop");
  let topcontainer = document.querySelector(".tbacktop");
  backtopcircle.addEventListener("mousemove", (event) => {
    gsap.to(backtopcircle, { x: event.offsetX * 0.8, y: event.offsetY * 0.8 });
    gsap.to(arrowtop, { x: event.offsetX, y: event.offsetY });
  });
  backtopcircle.addEventListener("mouseout", (event) => {
    gsap.to(backtopcircle, { x: 0, y: 0 });
    gsap.to(arrowtop, { x: 0, y: 0 });
  });
  let track = document.querySelector(".tflextrack");
  let tlhz = gsap.timeline({
    scrollTrigger: {
      trigger: ".thandimages",
      pin: true,
      pinSpacing: true,
      scrub: true,
      start: "top top+=10%",
      end: () => `top top-=${track.getBoundingClientRect().width - window.innerWidth * 0.5}`,
    },
  });
  tlhz
    .to(".tflextrack", {
      x: () => -(track.getBoundingClientRect().width - window.innerWidth * 0.5),
      ease: "none",
      delay: 0.1,
    })
    .to(".tflextrack", { duration: 0.1 });

  gsap.to(".handimgcover", {
    scaleX: 0,
    transformOrigin: "0% 50%",
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".tflextrack",
      start: "top top+=10%",
    },
  });
  gsap.to('.bantrackl', {
    x: '-28em',
    duration: 10,
    repeat: -1,
    ease: 'none'
  })
}

export default initTest;
