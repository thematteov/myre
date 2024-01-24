import "../styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initHome() {
  ///////links arrow

  let startaprj = gsap.timeline({ repeat: -1 });

  startaprj.fromTo(
    ".startaprj__track",
    5,
    { x: "0em" },
    {
      x: "-14.4em",
      ease: "none",
    }
  );

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
  } else {
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

    ///////home project video hover

    let projects = document.querySelectorAll(".prj__home__wrapper");

    projects.forEach((prj) => {
      ///mouseenter
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
      ///mouseleave
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

  ///////////menu
  const menucta = document.querySelector('.menubutton')
  const closecta = document.querySelector('.closebutton')
  menucta.addEventListener('click', ()=> {
    gsap.to('.menuwrapper', 0.6, {height: '100vh', ease: "power2.inOut"})
    gsap.fromTo('.menu__link', 0.6,
    {y: '120%'},
    {y: '0%', ease: "power2.inOut", stagger: 0.05, delay: 0.2})
    gsap.fromTo('.line1', .5, {scale: 0}, {scale: 1, ease: "power2.inOut", delay: 0.3})
  })
  closecta.addEventListener('click', ()=> {
    gsap.to('.menuwrapper', 0.6, {height: '0vh', ease: "power2.inOut"})
    gsap.to('.menu__link', 0.6, {y: '120%'})
    gsap.to('.line1', .5, {scale: 0})
  })

  //////FAQS
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


  ////SERVICES

  gsap.to(".track1", 10, { x: "-43.6em", ease: "none", repeat: -1 });
  gsap.to(".track2", 15, { x: "-204.9em", ease: "none", repeat: -1 });
  gsap.to(".track3", 25, { x: "-261.8em", ease: "none", repeat: -1 });
  gsap.to(".track4", 25, { x: "-244.8em", ease: "none", repeat: -1 });
  gsap.to(".track5", 10, { x: "-74.2em", ease: "none", repeat: -1 });

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

  //////////GENERAL//////////
  //->videos
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
  //->split text
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
}
gsap.registerPlugin(ScrollTrigger);
export default initHome;
