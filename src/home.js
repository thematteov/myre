import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initHome() {
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
  //home video
  if (window.matchMedia("(max-width: 768px)").matches) {
    gsap.fromTo(
      ".latest_video",
      { width: "0%" },
      {
        width: "96%",
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: ".home__first__section",
          start: "top bottom-=30%",
          end: "top top",
          scrub: true,
        },
      }
    );
  } else {
    gsap.fromTo(
      ".latest_video",
      { width: "0em" },
      {
        width: "66em",
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: ".home__first__section",
          start: "top bottom-=30%",
          end: "top top",
          scrub: true,
        },
      }
    );
  }

  let elements = $(".prj__cover__wrapper");

  // Exclude the last element
  let elementsToAnimate = elements.not(":first");
  let tl = gsap.timeline();
  tl.set(".prj__cover__wrapper", {
    transformOrigin: "top 0",
    transformStyle: "preserve-3d",
    transformPerspective: 2000,
  });
  tl.fromTo(
    elementsToAnimate,
    2,
    { rotationX: 0, rotationY: 0, translateX: '0%',translateY: '0%' },
    {
      rotationX: 180,
      rotationY: -90,
      stagger: -1,
      opacity: 0,
      translateX: '-10%',
      translateY: '-10%',
      scrollTrigger: {
        trigger: ".notebook__flex",
        pin: true,
        start: "top top",
        markers: false,
        scrub: true,
      },
    }
  );
  gsap.to(".notebook__flex", {
    scale: 1.2,
    scrollTrigger: {
      trigger: ".intro__section",
      start: "top top",
      markers: false,
      scrub: true,
    },
  });
  
  gsap.fromTo(
    ".cube__video",
    1.2,
    { y: "-4em", rotate: 0 },
    {
      y: "0em",
      ease: "Bounce.easeOut",
      rotate: 90,
      scrollTrigger: {
        trigger: ".latest_video",
        start: "top top",
        toggleActions: "play none none reverse",
      },
    }
  );
  gsap.fromTo(
    ".key__img",
    1.2,
    { scale: 1.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: ".hey__section",
        start: "top top+=20%",
        toggleActions: "play none none reverse",
      },
    }
  );
  gsap.to(".cover", {
    x: "-25%",
    ease: "none",
    scrollTrigger: {
      trigger: ".how__section",
      start: "top top-=20%",
      end: () =>
        "+=" + document.querySelector(".our__values__wrapper").offsetWidth,
      pin: true,
      scrub: true,
      pinSpacing: false,
    },
  });

  const services = gsap.utils.toArray(".service__wrapper");

  services.forEach((service, index) => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      const tween = gsap.to(service, {
        scrollTrigger: {
          trigger: service,
          start: "bottom bottom",
          scrub: true,
          markers: false,
        },
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: service,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
        markers: false,
        id: "pin",
        endTrigger: services.length,
        end: "max",
      });
      // Your mobile-specific JavaScript code here
    } else {
      // Code for non-mobile devices

      ScrollTrigger.create({
        trigger: service,
        start: "top top+=20%",
        pin: true,
        pinSpacing: false,
        markers: false,
        endTrigger: services.length,
        end: "max",
      });
    }
  });
  ScrollTrigger.create({
    trigger: ".why__us__section",
    start: "bottom bottom",
    pin: true,
    pinSpacing: false,
    markers: false,
  });

  let enterbtn = document.querySelector(".enter");
  //////preloader trigger
  enterbtn.addEventListener("click", () => {
    gsap.to(".preloader", 0, {
      opacity: 0,
      ease: "Power2.easeOut",
    });
    gsap.to(".preloader", 0, {
      display: "none",
      delay: 1.2,
    });

    ///////NAV LOGO SCRUB
    let introTl = gsap.timeline();
    introTl.set(".logo__svg", { transformOrigin: "0 50" });
    introTl.fromTo(
      ".logo__svg",
      1.5,
      { height: "50em" },
      {
        height: "4em",
        delay: 0.5,
        transformOrigin: "0 50",
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: ".logo__svg",
        },
      }
    );

    const text = new SplitType(".splitfirst");
    text.lines;

    ///////SPLITTEXT

    let lines = document.querySelectorAll(".splitfirst");

    lines.forEach((value) => {
      gsap.fromTo(
        value.querySelectorAll(".word"),
        1,
        { y: "70%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "Power3.easeOut",
          stagger: 0.05,
          delay: 1,
        }
      );
    });
    introTl.fromTo(
      ".index__line",
      1.2,
      { width: "0vw" },
      {
        width: "100vw",
        ease: "Power3.easeOut",
        stagger: 0.05,
        delay: 0,
      }
    );
    introTl.fromTo(
      ".index__i",
      1.2,
      { y: "70%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "Power3.easeOut",
        stagger: 0.05,
        delay: -0.5,
      }
    );
    introTl.fromTo(
      ".image__me",
      1.2,
      { height: "0em" },
      {
        height: "5.63em",
        ease: "Power3.easeOut",
        delay: -1,
      }
    );
  });
  //////SVG LINES/////////////

  var connected = false;

  gsap.defaults({ ease: "elastic.out(2, 0.5)" });

  // Define the IDs and classes of the elements you want to apply the interaction to
  var elementSelectors = document.querySelectorAll(".linesvg");
  var lineswrapper = document.querySelector(".lines__wrapper");
  var rectWidth = lineswrapper.getBoundingClientRect().width;
  var rectHeight = lineswrapper.getBoundingClientRect().height;

  elementSelectors.forEach(function (selector, index) {
    var svg = selector;
    var path = svg.querySelector("#path");
    path.setAttribute("stroke-width", `${1 + index}px`);
    var svgRect = svg.getBoundingClientRect();
    var top = svgRect.top;
    var height = svgRect.height;
    var startY = height / 2;
    var p0 = { x: 0, y: startY };
    var p1 = { x: rectWidth / 2, y: startY };
    var p2 = { x: rectWidth, y: startY };
    var isInsideSVG = false; // Track if the mouse is inside the current SVG

    window.addEventListener("resize", () => {
      p0 = { x: 0, y: startY };
      p1 = { x: rectWidth / 2, y: startY };
      p2 = { x: rectWidth, y: startY };
      svgRect = svg.getBoundingClientRect();
      top = svgRect.top;
      height = svgRect.height;
      startY = height / 2;
    });
    window.addEventListener("scroll", () => {
      svgRect = svg.getBoundingClientRect();
      top = svgRect.top;
    });

    gsap.ticker.add(update);
    update();

    function update() {
      var d =
        "M" +
        p0.x +
        "," +
        p0.y +
        " Q" +
        p1.x +
        "," +
        p1.y +
        " " +
        p2.x +
        "," +
        p2.y;

      path.setAttribute("d", d);
    }

    svg.addEventListener("mouseenter", () => {
      isInsideSVG = true;
    });

    svg.addEventListener("mouseleave", () => {
      isInsideSVG = false;
      if (connected) {
        connected = false;
        gsap.to(p1, {
          duration: 1,
          x: rectWidth / 2,
          y: height / 2,
          onComplete: () => (connected = true),
        });
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (isInsideSVG) {
        if (p1.y > height * 0.9 || p1.y < -3) {
          if (connected) {
            connected = false;
            gsap.to(p1, {
              duration: 2.5,
              // x: e.clientX,
              y: height / 2,
              onComplete: () => (connected = true),
            });
          }
        }
        if (!connected) {
          connected = true;
          gsap.killTweensOf(p1);
        }

        // p1.x = e.clientX;
        p1.y = e.clientY - top;
      }
    });
  });

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
        gsap.to(faq.querySelector(".answer__wrapper"), 0.5, {
          height: "auto",
          marginBottom: "1em",
          ease: "Power3.easeOut",
          onComplete: () => (open = true),
        });
      } else if (open === true) {
        gsap.to(faq.querySelector(".answer__wrapper"), 0.5, {
          height: "0em",
          ease: "Power3.easeOut",
          marginBottom: "0em",
          onComplete: () => (open = false),
        });
      }
    });
  });
}

gsap.registerPlugin(ScrollTrigger);
export default initHome;
