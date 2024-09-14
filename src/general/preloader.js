import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import SplitType from "split-type";
import { CustomEase } from "gsap/all";
import { display } from "@splidejs/splide/src/js/utils";
gsap.registerPlugin(CustomEase);
function preloader() {
  let intro = document.querySelector(".intro");
  new SplitType(".intro");
  var imgLoad = imagesLoaded(document.querySelectorAll("img"));

  imgLoad.on("always", function () {
    loadComplete();
  });
  function loadComplete() {
    let tlanimations = gsap.timeline();
    tlanimations.to(".preloader__changing", 0.8, {
      yPercent: -98,
      ease: "power3.inOut",
      delay: 1,
    });
    tlanimations.to(".preloader__changing", 0.8, {
      yPercent: -200,
      ease: "power3.inOut",
    });
    tlanimations.to(".preloader", 1.5, {
      scale: 1.4,
      opacity: 0,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(".preloader", { display: "none" });
      },
    });
    if (intro) {
      tlanimations.fromTo(
        ".hr__image",
        2.4,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          ease: "power3.inOut",
        },
        "-=2"
      );
      tlanimations.fromTo(
        intro.querySelectorAll(".word"),
        1.6,
        { yPercent: 100, rotationX: -90 },
        {
          yPercent: 0,
          rotationX: 0,
          ease: "power3.inOut",
          stagger: 0.05,
        },
        "-=1.6"
      );
    }
  }
}
export default preloader;
