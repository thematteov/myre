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
  gsap.from(".awardline", {
    yPercent: 100,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".awards__lines__container",
      start: "top bottom-=25%",
      toggleActions: "play none none reverse",
    },
  });

  function availability() {
    document.querySelectorAll(".availability").forEach((el) => {
      gsap.to(el.querySelector(".availability__scale"), {
        scale: 2.5,
        duration: 2,
        opacity: 0,
        delay: 0.3,
        repeat: -1,
        ease: "power2.inOut",
      });
    });
  }
  function switchpackage() {
    let switchbtn = document.querySelector(".switchpackage");
    let switchcounter = 1;
    switchbtn.addEventListener("click", () => {
      if (switchcounter === 1) {
        switchcounter = 2;
        gsap.to(".switchcube", {
          left: "100%",
          xPercent: -100,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(".buy__card", {
          yPercent: -100,
          duration: 1.2,
          ease: "power2.inOut",
        });
        gsap.to(".availability", {
          yPercent: -100,
          duration: 1.2,
          ease: "power2.inOut",
        });
        gsap.to(".website__type__image", {
          xPercent: 100,
          duration: 1.2,
          ease: "power2.inOut",
        });
      } else if (switchcounter === 2) {
        switchcounter = 1;
        gsap.to(".switchcube", {
          left: "0%",
          xPercent: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(".buy__card", {
          yPercent: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
        gsap.to(".availability", {
          yPercent: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
        gsap.to(".website__type__image", {
          xPercent: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }
    });
  }
  function homeimages() {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    tl.to(".hr__image", {
      opacity: 0,
      duration: 0,
      stagger: -0.4,
      ease: "power1.inOut",
    }).to(".hr__image", {
      opacity: 1,
      duration: 0,
      stagger: 0.4,
      ease: "power1.inOut",
    });
  }
  function process() {
    ScrollTrigger.create({
      trigger: ".process__steps__right",
      pin: ".benefits__title",
      start: "top top+=5%",
      end: "bottom center",
      pinSpacing: false,
    });
  }
  process();
  homeimages();
  switchpackage();
  availability();
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
