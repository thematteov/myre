import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";

gsap.registerPlugin(ScrollTrigger);
function initProject() {
  function imagesTriggers() {
    let images = gsap.utils.toArray(".project__image");

    images.forEach((el) => {
      gsap.from(el.querySelector(".case__image__wrapper"), {
        scale: 0.5,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=20%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(el.querySelector(".case__image"), {
        scale: 1.5,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=10%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }
  imagesTriggers();
}

export default initProject;
