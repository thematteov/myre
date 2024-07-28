import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";
function initHome() {
  let tl = gsap.timeline();
  tl.to(".hero_top", {
    scale: 0.8,
    scrollTrigger: {
      trigger: ".mpiko_hero_section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      // markers: true
    },
  });

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
  let packages = document.querySelectorAll(".pg");

  packages.forEach((p, i) => {
    gsap.to(p, {
      yPercent: -60 * (i + 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".clients",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      },
    });
    gsap.to(".hero_block", 0.5, {
      ease: "power3.inOut",
      background: "#f9f9f8",
      scrollTrigger: {
        trigger: ".clients",
        start: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });
  });
  ////////////shuffleimages
  let shuffletl = gsap.timeline({ play: true, repeat: -1, repeatDelay: 0.5 });
  shuffletl.fromTo(
    ".hero_img",
    0.01,
    {
      opacity: 0,
    },
    { opacity: 1, stagger: 0.5 }
  );

  /////services

  //////////GENERAL//////////
  //->videos
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
