import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initProject() {
  let startaprj = gsap.timeline({ repeat: -1 });

  startaprj.fromTo(
    ".startaprj__track",
    5,
    { x: "0em" },
    {
      x: "-11.4em",
      ease: "none",
    }
  );
  //////infinite banner
  const text = new SplitType(".split");
  const textside = new SplitType(".split__side");
  const char = new SplitType(".chars");
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

  //////page animations
  let caseTL = gsap.timeline({ delay: 1.5 });
  if (window.matchMedia("(max-width: 768px)").matches) {
    caseTL.fromTo(
      ".project__left",
      1.5,
      {
        width: "0%",
      },
      { width: "100%", ease: "Power3.easeOut" }
    );

    caseTL.fromTo(
      ".case__image__wrapper",
      1.5,
      {
        height: "0em",
        transformOrigin: "bottom center",
      },
      { height: "48.8em", stagger: 0.06, ease: "Power3.easeOut", delay: -0.7 }
    );
  } else {
    ///navigation
    gsap.to(".home__nav", 1, {
      y: "0em",
      scrollTrigger: {
        pin: ".home__nav",
        pinSpacing: true,
        start: "top top",
        end: "max",
      },
    });
    ScrollTrigger.create({
      pin: ".nav__wrapper",
      start: "top top",
      pinSpacing: false,
    });

    caseTL.fromTo(
      ".project__left",
      1.5,
      {
        width: "0%",
      },
      { width: "58%", ease: "Power3.easeOut" }
    );

    caseTL.fromTo(
      ".case__image__wrapper",
      1.5,
      {
        height: "0em",
        transformOrigin: "bottom center",
      },
      { height: "27.3em", stagger: 0.06, ease: "Power3.easeOut", delay: -0.7 }
    );
  }
  caseTL.fromTo(
    ".case__image",
    1.5,
    {
      scale: 1.2,
    },
    { scale: 1, stagger: 0.06, ease: "Power3.easeOut", delay: -1.5 }
  );
  caseTL.fromTo(
    ".footer__text__wrp",
    1,
    {
      yPercent: 100,
    },
    { yPercent: 0, stagger: 0.1, ease: "Power3.easeOut", delay: -1 }
  );
  gsap.fromTo(
    ".info__ttl__wrapper",
    10,
    {
      x: "0em",
    },
    { x: "-48.5em", ease: "none", repeat: -1 }
  );

  ///////general
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
}
gsap.registerPlugin(ScrollTrigger);
export default initProject;
