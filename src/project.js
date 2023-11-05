import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initProject() {
  //////infinite banner

  gsap.to(".latest__banner", 20, {
    x: "-82.6em",
    ease: "linear",
    repeat: -1,
  });

  gsap.set(".logo__svg", {
    height: "4em",
  });
  const text = new SplitType(".split");
  const textside = new SplitType(".split__side");
  const char = new SplitType(".chars");
  text.lines;
  textside.lines;
  const elementsToWrap = document.querySelectorAll(".line");

  elementsToWrap.forEach((element) => {
    const wrapper = document.createElement("span");
    wrapper.className = "line-wrapper";
    wrapper.style.overflowY = "hidden";
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
  });
  ///////SPLITTEXT

  let lines = document.querySelectorAll(".split");
  let chars = document.querySelectorAll(".chars");

  lines.forEach((value, index) => {
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
      1,
      { y: "100%", opacity: 1 },
      {
        y: "0%",
        opacity: 1,
        force3D: true,
        ease: "Power2.easeOut",
        stagger: 0.1,
      }
    );
  });
  chars.forEach((value) => {
    let tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: value,
        start: "top bottom-=30%",
        toggleActions: "play none none reverse",
      },
    });
    tl.fromTo(
      value.querySelectorAll(".char"),
      1,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power2.easeOut",
        stagger: 0.05,
      }
    );
  });

  ////works images stack

  const projImages = gsap.utils.toArray(".project__image__wrapper");
  if (window.matchMedia("(max-width: 768px)").matches) {
    projImages.forEach((img, index) => {
      const tween = gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: () => `top top+=40%`,
          end: () => `bottom bottom`,
          scrub: true,
          markers: false,
        },
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: img,
        start: "top top+=40%",
        pin: true,
        pinSpacing: false,
        markers: false,
        id: "pin",
        endTrigger: img.length,
        end: "max",
      });
    });
  } else {
    // Code for non-mobile devices
    projImages.forEach((img, index) => {
      const tween = gsap.fromTo(
        img,
        0.8,
        { scale: 1, opacity: 1 },
        {
          scale: 0.8,
          opacity: 0.7,
          scrollTrigger: {
            trigger: img,
            start: "top top+=15%",
            pin: true,
            pinSpacing: false,
            markers: false,
            id: "pin",
            endTrigger: img.length,
            end: "max",
            toggleActions: "play none none reverse",
          },
          ease: "Power3.easeInOut",
        }
      );
    });
    ScrollTrigger.create({
      trigger: ".project__right__wrapper",
      start: "top top+=12%",
      pin: true,
      pinSpacing: false,
      markers: false,
    });
  }
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

  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
}
gsap.registerPlugin(ScrollTrigger);
export default initProject;
