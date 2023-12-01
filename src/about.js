import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initAbout() {
  //////navigation
  gsap.to(".home__nav", 1, {
    y: "0em",
    scrollTrigger: {
      pin: ".home__nav",
      pinSpacing: true,
      start: "top top",
      end: "max",
    },
  });
  let startaprj = gsap.timeline({ repeat: -1 });

  startaprj.fromTo(
    ".startaprj__track",
    5,
    { x: "0em" },
    {
      x: "-10em",
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

  //////page animations
  if (window.matchMedia("(max-width: 768px)").matches) {
    gsap.to(".about__hero__content", {
      y: "-30em",
      scrollTrigger: { scrub: true },
      ease: "none",
    });
  } else {
    gsap.to(".about__hero__content", {
      y: "-15em",
      scrollTrigger: { scrub: true },
      ease: "none",
    });
  }

  ///////general
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
}
gsap.registerPlugin(ScrollTrigger);
export default initAbout;
