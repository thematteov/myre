import Lenis from "@studio-freight/lenis";
import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initProject() {

  let g = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    y = window.innerWidth <= 980,
    h = window.matchMedia("(max-width: 768px)");
  if (!g || !y || !h.matches) {
  }

  ///////NAV LOGO SCRUB
  let logoTl = gsap.timeline({});
  logoTl.set(".logo__svg", { transformOrigin: "50% 0%" });
  logoTl.fromTo(
    ".logo__svg",
    1.2,
    { scale: 1 },
    {
      scale: 0.8,
      transformOrigin: "100 50",
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".logo__svg",
        start: "top top",
        pin: true,
        scrub: true,
      },
    }
  );
  logoTl.fromTo(
    ".deliverable__wrapper",
    { width: "0%" },
    {
      width: "20%",
      scrollTrigger: {
        trigger: ".third__section",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    }
  );
  gsap.fromTo(
    ".service__number",
    2,
    { x: "-100%" },
    {
      x: "0%",
      ease: "Power3.easeInOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".services",
        start: "top bottom",
        toggleActions: "play reverse play reverse",
      },
    }
  );
  ///////SPLITTEXT
  const text = new SplitType(".split");
  text.lines;

  let lines = document.querySelectorAll(".split");

  lines.forEach((value) => {
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
      0.8,
      { y: "50%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.1,
      }
    );
  });

  ////works images stack
  const projImages = gsap.utils.toArray(".project__image__wrapper");

  projImages.forEach((img, index) => {
    const tween = gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: () => `top top`,
        end: () => `bottom bottom`,
        scrub: true,
        markers: false,
      },
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: img,
      start: "top top",
      pin: true,
      pinSpacing: false,
      markers: false,
      id: "pin",
      endTrigger: img.length,
      end: "max",
    });
  });
  ////works images stack
  var myVideo = document.getElementsByTagName("video");
  for (let i = 0; i < myVideo.length; i++) {
    if (typeof myVideo[i].loop == "boolean") {
      // loop supported
      myVideo[i].loop = true;
    } else {
      // loop property not supported
      myVideo[i].addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
  }

  const videos = document.querySelectorAll('video');
            videos.forEach(video => video.play());
}
gsap.registerPlugin(ScrollTrigger);
export default initProject;
