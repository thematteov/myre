import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import SplitType from "split-type";
function preloader() {
  let intro = document.querySelector(".intro");
  new SplitType(".intro");
  var imgLoad = imagesLoaded(document.querySelectorAll("img"));

  imgLoad.on("always", function (instance) {
    loadComplete();
  });
  function loadComplete() {
    let tlanimations = gsap.timeline();
    tlanimations.to(".preloader__changing", 0.4, {
      yPercent: -102,
      ease: "power2.inOut",
      delay: 1,
    });
    tlanimations.to(".preloader__changing", 0.4, {
      yPercent: -198,
      ease: "power2.inOut",
      delay: 0.4,
    });
    tlanimations.to(".preloader", 1.1, {
      yPercent: -100,
      ease: "power2.inOut",
      delay: 0.4
    });
    if (intro) {
      tlanimations.fromTo(
        intro.querySelectorAll(".word"),
        1.2,
        { yPercent: 100, rotationX: -90 },
        {
          yPercent: 0,
          rotationX: 0,
          ease: "Power3.easeOut",
          stagger: 0.05,
          delay: -0.5,
        }
      );
      tlanimations.fromTo(
        '.hr__image',
        1.5,
        { yPercent: -120},
        {
          yPercent: 0,
          ease: "Power2.easeOut",
          stagger: {
            amount: 0.2,
            from: 'center'
          },
          delay: -0.7,
        }
      );
    }
  }
}
export default preloader;
