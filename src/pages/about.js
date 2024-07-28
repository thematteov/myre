import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";

gsap.registerPlugin(ScrollTrigger);

function initabout() {
  let roibtn = document.querySelector(".roi");
  let qualitybtn = document.querySelector(".quality");
  let agencyofone = document.querySelector(".agencyofone");
  agencyofone.addEventListener("click", () => {
    gsap.to(".agencyofonepanel", 0.6, { yPercent: 100, ease: "power2.inOut" });
    gsap.to(".roipanel", 0.6, { yPercent: -100, ease: "power2.inOut" });
    gsap.to(".qualitypanel", 0.6, { yPercent: -100, ease: "power2.inOut" });
    gsap.to(".sqr1", 0.3, {
      background: "rgba(210, 53, 3, 100)",
      ease: "power2.inOut",
    });
    gsap.to(".sqr2", 0.3, {
      background: "rgba(210, 53, 3, 0)",
      ease: "power2.inOut",
    });
    gsap.to(".sqr3", 0.3, {
      background: "rgba(210, 53, 3, 0)",
      ease: "power2.inOut",
    });
  });
  qualitybtn.addEventListener("click", () => {
    gsap.to(".qualitypanel", 0.6, { yPercent: 100, ease: "power2.inOut" });
    gsap.to(".roipanel", 0.6, { yPercent: -100, ease: "power2.inOut" });
    gsap.to(".agencyofonepanel", 0.6, { yPercent: -100, ease: "power2.inOut" });
    gsap.to(".sqr2", 0.3, {
      background: "rgba(210, 53, 3, 100)",
      ease: "power2.inOut",
    });
    gsap.to(".sqr3", 0.3, {
      background: "rgba(210, 53, 3, 0)",
      ease: "power2.inOut",
      delay: 0.2,
    });
  });
  roibtn.addEventListener("click", () => {
    gsap.to(".roipanel", 0.6, { yPercent: 100, ease: "power2.inOut" });
    gsap.to(".qualitypanel", 0.6, { yPercent: -100, ease: "power2.inOut" });
    gsap.to(".agencyofonepanel", 0.6, { yPercent: -100, ease: "power2.inOut" });
    gsap.to(".sqr2", 0.3, {
      background: "rgba(210, 53, 3, 100)",
      ease: "power2.inOut",
    });
    gsap.to(".sqr3", 0.3, {
      background: "rgba(210, 53, 3, 100)",
      ease: "power2.inOut",
      delay: 0.2,
    });
  });

  /////////////lines

  gsap.to(".bottomline", 1, {
    width: "100%",
    ease: "power2.inOut",
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.about__values',
        start: 'top center',
    }
  });
  gsap.to(".lineleft", 1, {
    height: "100%",
    ease: "power2.inOut",
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.about__values',
        start: 'top center',
    }
  });
  gsap.to(".linetop", 1, {
    width: "100%",
    ease: "power2.inOut",
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.about__values',
        start: 'top center',
    }
  });
}
export default initabout;
