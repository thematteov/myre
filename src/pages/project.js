import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";

gsap.registerPlugin(ScrollTrigger);
function initProject() {
  let slider = document.querySelector(".details__flex");
  let tldetails = gsap.timeline({
    scrollTrigger: {
      trigger: ".past__prj__details",
      start: "top top",
      end: () =>
        `${slider.getBoundingClientRect().width - window.innerWidth * 0.5}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.9,
    },
  });
  tldetails
    .to("body", { duration: 0.1 })
    .to(".details__flex", {
      x: () =>
        -(slider.getBoundingClientRect().width - window.innerWidth * 0.9),
      ease: "none",
    })
    .to("body", { duration: 0.1 });
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
