import "./styles/style.css";
import '@splidejs/splide/css/core';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";
import { Splide } from "@splidejs/splide";

function initHome() {
  ///////links arrow

  let startaprj = gsap.timeline({ repeat: -1 });

  startaprj.fromTo(
    ".startaprj__track",
    5,
    { x: "0em" },
    {
      x: "-11.4em",
      ease: "none",
    }
  );

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
  //home projects
  if (window.matchMedia("(max-width: 768px)").matches) {
    let projects = document.querySelectorAll(".prj__home__wrapper");

    projects.forEach((prj) => {
      gsap.to(prj.querySelector(".prj__home__video"), 0.2, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: prj,
          start: "top top+=30%",
          toggleActions: "play none none reverse",
          onEnter: () =>
            prj
              .querySelector(".prj__home__video")
              .querySelector(".video__embed video")
              .play(),
        },
      });
      ///front back text
      gsap.to(prj.querySelector(".front__back"), 0.5, {
        y: "-5em",
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: prj,
          start: "top top",
          toggleActions: "play none none reverse",
        },
      });
      /////////
    });

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
  } else {
    //////navigation
    gsap.to(".home__nav", 1, {
      y: "0em",
      scrollTrigger: {
        pin: ".home__nav",
        pinSpacing: true,
        start: "top top",
        end: "max",
      },
    });
    ScrollTrigger.create({
      pin: ".nav__wrapper",
      start: "top top",
      pinSpacing: false,
    });
    ScrollTrigger.create({
      pin: ".intro__section__wrapper",
      start: "top top+=4%",
      pinSpacing: false,
    });
    let scrollable = document.querySelector(".home__prj__right");

    gsap.to(".home__prj__right", {
      y: () => window.innerHeight - scrollable.clientHeight,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects__flex",
        pin: ".home__first__section",
        start: "top top",
        scrub: true,
        pinSpacing: true,
      },
    });
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

    ///////home project video hover

    let projects = document.querySelectorAll(".prj__home__wrapper");

    projects.forEach((prj) => {
      prj.addEventListener("mouseenter", () => {
        gsap.to(prj.querySelector(".prj__home__video"), 0.2, {
          opacity: 1,
          ease: "none",
        });
        gsap.fromTo(
          prj.querySelector(".home__prj__intro"),
          0.5,
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, ease: "Power3.easeOut" }
        );
        ///front back text
        gsap.to(prj.querySelector(".front__back"), 0.5, {
          y: "-1.1em",
          ease: "Power3.easeOut",
        });
        //video play
        prj
          .querySelector(".prj__home__video")
          .querySelector(".video__embed video")
          .play();
      });
      prj.addEventListener("mouseleave", () => {
        gsap.to(prj.querySelector(".prj__home__video"), 0.2, {
          opacity: 0,
          ease: "none",
        });
        gsap.fromTo(
          prj.querySelector(".home__prj__intro"),
          0.5,
          { opacity: 1, yPercent: 0 },
          { opacity: 0, yPercent: 100, ease: "Power3.easeOut" }
        );
        ///front back text
        gsap.to(prj.querySelector(".front__back"), 0.5, {
          y: "0em",
          ease: "Power3.easeOut",
        });
        //video pause
        prj
          .querySelector(".prj__home__video")
          .querySelector(".video__embed video")
          .pause();
      });
    });
  }

  //////gallery lines
  let gallerylines = document.querySelectorAll(".gallery__line");

  gallerylines.forEach((e, index) => {
    e.style.height = gallerylines.length - index + "px";
  });
  gsap.fromTo(
    ".gallery__line",
    1.2,
    { scaleX: 0 },
    {
      scaleX: 1,
      scrollTrigger: {
        trigger: ".lines__wrapper__gallery",
        start: "top bottom-=40%",
        toggleActions: "play none none reverse",
      },
      stagger: 0.1,
      transformOrigin: "center center",
      ease: "Power3.easeOut",
    }
  );

  //////FAQS

  let faqs = document.querySelectorAll(".index__line__gallery");
  let open = false;
  faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
      if (open === false) {
        gsap.to(faq.querySelector(".question__square"), 0.5, {
          width: "2em",
          ease: "Power3.easeOut",
        });
        gsap.to(faq.querySelector(".answer__wrapper"), 0.5, {
          height: "auto",
          marginBottom: "1em",
          ease: "Power3.easeOut",
          onComplete: () => (open = true),
        });
      } else if (open === true) {
        gsap.to(faq.querySelector(".question__square"), 0.5, {
          width: "1em",
          ease: "Power3.easeOut",
        });
        gsap.to(faq.querySelector(".answer__wrapper"), 0.5, {
          height: "0em",
          ease: "Power3.easeOut",
          marginBottom: "0em",
          onComplete: () => (open = false),
        });
      }
    });
  });

  ////concepts

  var splide = new Splide( '.splide', {
    drag   : 'free',
    snap   : true,
    arrows: false,
    perPage: 4,
    autoWidth: true,
    pagination: false,
    trimSpace: false,
  } );

  splide.on('drag', ()=>{
    gsap.to('.splide__slide', 0.5, {scale: 0.5, ease: 'Power3.easeOut'})
  })
  splide.on('dragged', ()=>{
    gsap.to('.splide__slide', 0.5, {scale: 1, ease: 'Power3.easeOut'})
  })
  
  splide.mount();

  ////SERVICES

  gsap.to(".track1", 10, { x: "-49.2em", ease: "none", repeat: -1 });
  gsap.to(".track2", 15, { x: "-220.8em", ease: "none", repeat: -1 });
  gsap.to(".track3", 25, { x: "-288.9em", ease: "none", repeat: -1 });
  gsap.to(".track4", 25, { x: "-266.2em", ease: "none", repeat: -1 });
  gsap.to(".track5", 10, { x: "-81.7em", ease: "none", repeat: -1 });

  gsap.to(".track", {
    x: "-40em",
    ease: "none",
    scrollTrigger: {
      scrub: true,
      trigger: ".services__wrapper",
      start: "top bottom",
      end: "bottom top",
    },
  });
  ///////general
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
  // AroundCircle("services__circle", "service__card");
  // AroundCircle("services__circle__back", "service__card__back");
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
