import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
function initHome() {
  let homearchiveimg = document.querySelectorAll(".homearchiveimg");

  homearchiveimg.forEach((p, i) => {
    gsap.to(p, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: p,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
  let latestclients = document.querySelectorAll(".pg");

  latestclients.forEach((p, i) => {
    gsap.to(p, {
      yPercent: -60 * (i + 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".clients",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  //////////PROJECTS//////////
  gsap.from(".case", {
    yPercent: -50,
    opacity: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".works_section",
      start: "top bottom-=25%",
      toggleActions: "play none none reverse",
    },
  });

  function availability() {
    gsap.to(".availability__scale", {
      scale: 2.5,
      duration: 1.2,
      opacity: 0,
      delay: 0.3,
      repeat: -1,
      ease: "power2.inOut",
    });
  }
  availability();
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
