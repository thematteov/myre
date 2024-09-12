import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap/all";
import splits from "../general/textsplit";

gsap.registerPlugin(ScrollTrigger);
function initProject() {
  gsap.to(".prjcover", {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: {
      trigger: ".prjcovercontainer",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
  });
  splits();
}

export default initProject;
