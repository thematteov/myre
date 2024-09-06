import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
function splits() {
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  function split() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => video.play());

    const text = new SplitType(".split");
    const textside = new SplitType(".split__side");
    text.lines;
    textside.lines;
    const elementsToWrap = document.querySelectorAll(".line");

    elementsToWrap.forEach((element) => {
      const wrapper = document.createElement("span");
      wrapper.className = "line-wrapper";
      wrapper.style.overflowY = "hidden";
      wrapper.style.perspective = "1000px";
      element.parentNode.replaceChild(wrapper, element);
      wrapper.appendChild(element);
    });

    let lines = document.querySelectorAll(".split");

    lines.forEach((value) => {
      let tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: value,
          start: "top bottom-=15%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });
      tl.fromTo(
        value.querySelectorAll(".word"),
        1,
        { yPercent: 100, rotationX: -90 },
        {
          yPercent: 0,
          rotationX: 0,
          ease: "Power3.easeOut",
          stagger: 0.03,
        }
      );
    });
  }

  function splitMOBILE() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => video.play());

    const text = new SplitType(".split");
    const textside = new SplitType(".split__side");
    text.lines;
    textside.lines;
    const elementsToWrap = document.querySelectorAll(".line");

    elementsToWrap.forEach((element) => {
      const wrapper = document.createElement("span");
      wrapper.className = "line-wrapper";
      wrapper.style.overflowY = "hidden";
      wrapper.style.perspective = "1000px";
      element.parentNode.replaceChild(wrapper, element);
      wrapper.appendChild(element);
    });

    let lines = document.querySelectorAll(".split");

    lines.forEach((value) => {
      let tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: value,
          start: "top bottom-=5%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });
      tl.fromTo(
        value.querySelectorAll(".word"),
        0.8,
        { yPercent: 100, rotationX: -90 },
        {
          yPercent: 0,
          rotationX: 0,
          ease: "Power3.easeOut",
          stagger: 0.03,
        }
      );
    });
  }

  function splithorizontal() {
    let cahrsSlide = document.querySelectorAll(".splitx");
    new SplitType(".splitx");
    const elementsToWrap = document.querySelectorAll(".splitx .char");
    gsap.set(elementsToWrap, { x: "-150%" });

    elementsToWrap.forEach((element) => {
      const wrapper = document.createElement("span");
      wrapper.className = "char__wrapper";
      wrapper.style.overflow = "hidden";
      element.parentNode.replaceChild(wrapper, element);
      wrapper.appendChild(element);
    });

    cahrsSlide.forEach((value) => {
      let tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: value,
          start: "top bottom-=10%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: false,
          scrub: true,
        },
      });
      tl.to(value.querySelectorAll(".char"), 1, {
        x: "0%",
        ease: "Power2.out",
        stagger: 0.02,
      });
    });
  }
  split();
  splithorizontal();
  if (isMobile()) {
    splitMOBILE();
  }
}
export default splits;