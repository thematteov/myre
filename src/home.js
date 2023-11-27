import "./styles/style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/src";
import SplitType from "split-type";

function initHome() {
  let startaprj = gsap.timeline({ repeat: -1 });

  startaprj.fromTo(
    ".startaprj__track",
    5,
    { x: "0em" },
    {
      x: "-10em",
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
        width: "100%",
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
        width: "50em",
        ease: "none",
        scrollTrigger: {
          trigger: ".home__first__section",
          start: "top bottom-=30%",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".home__details__track",
      { x: "0%" },
      {
        x: "-103.5%",
        ease: "none",
        scrollTrigger: {
          trigger: ".home__first__section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    ScrollTrigger.create({
      trigger: ".home__first__section",
      start: "top top",
      end: "bottom top-=100%",
      pin: true,
      pinSpacing: false,
    });
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
    { rotationX: 0, rotationY: 0, translateX: "0%", translateY: "0%" },
    {
      rotationX: 180,
      rotationY: -90,
      stagger: -1,
      opacity: 0,
      translateX: "-10%",
      translateY: "-10%",
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

  ScrollTrigger.create({
    trigger: ".why__us__section",
    start: "bottom bottom",
    pin: true,
    pinSpacing: false,
    markers: false,
  });
  //////SVG LINES/////////////

  var connected = false;

  gsap.defaults({ ease: "elastic.out(2, 0.5)" });

  // Define the IDs and classes of the elements you want to apply the interaction to
  var elementSelectors = document.querySelectorAll(".linesvg");
  var lineswrapper = document.querySelector(".index__line");
  var rectWidth = lineswrapper.getBoundingClientRect().width;
  var rectHeight = lineswrapper.getBoundingClientRect().height;

  elementSelectors.forEach(function (selector, index) {
    var svg = selector;
    var path = svg.querySelector("#path");
    path.setAttribute("stroke-width", `${8 - index * 2}px`);
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

  ///////general
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => video.play());
}

gsap.registerPlugin(ScrollTrigger);
export default initHome;
