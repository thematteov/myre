import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";
function initNewsletter() {
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
        start: "top bottom-=20%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      value.querySelectorAll(".char"),
      0.6,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.05,
      }
    );
  });
}
gsap.registerPlugin(ScrollTrigger);
export default initNewsletter;
